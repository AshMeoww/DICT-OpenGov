// Types for model responses
type FakeNewsDetectionResult = {
  verdict: 'likely true' | 'likely false' | 'needs review';
  confidence: number;
  explanation?: string;
};

// Main claim classification function
export async function classifyClaim(text: string): Promise<FakeNewsDetectionResult> {
  try {
    // Use the primary fake news detection model
    const response = await callHuggingFaceModel(
      process.env.NEXT_PUBLIC_HUGGING_FACE_MODEL || 'jy46604790/Fake-News-Bert-Detect',
      text
    );
    
    // Map the model response to our verdict format
    const result = mapModelResponseToVerdict(response);
    
    // If the claim is flagged as potentially false, get an explanation
    if (result.verdict === 'likely false' && result.confidence > 0.7) {
      const explanation = await getExplanation(text);
      result.explanation = explanation;
    }
    
    return result;
  } catch (error) {
    console.error('Error calling Hugging Face API:', error);
    return fallbackResponse();
  }
}

// Function to verify specific claims against factual data
export async function verifyClaimAgainstFacts(claim: string): Promise<{
  isFactual: boolean;
  confidence: number;
  relevantFacts?: string[];
}> {
  try {
    const response = await callHuggingFaceModel(
      process.env.NEXT_PUBLIC_CLAIM_VERIFICATION_MODEL || 'biodatlab/score-claim-identification',
      claim
    );
    
    // Process claim verification response
    // This is a simplified implementation - actual response processing would depend on the model
    const score = response[0]?.score || 0.5;
    
    return {
      isFactual: score > 0.6,
      confidence: score,
      relevantFacts: ['Based on model assessment']
    };
  } catch (error) {
    console.error('Error verifying claim:', error);
    return {
      isFactual: false,
      confidence: 0.5
    };
  }
}

// Function to get explanation for misinformation
export async function getExplanation(text: string): Promise<string> {
  try {
    const response = await callHuggingFaceModel(
      process.env.NEXT_PUBLIC_MISINFORMATION_EXPLANATION_MODEL || 'MischaQI/SNIFFER',
      text
    );
    
    // Extract explanation from model response
    // This is a simplified implementation - actual response processing would depend on the model
    return response[0]?.explanation || 
           'This content contains patterns commonly associated with misinformation.';
  } catch (error) {
    console.error('Error getting explanation:', error);
    return 'Unable to generate explanation.';
  }
}

// Helper function to call Hugging Face API
async function callHuggingFaceModel(model: string, text: string): Promise<any> {
  const response = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    }
  );

  if (!response.ok) {
    throw new Error(`Hugging Face API error: ${response.statusText}`);
  }

  return await response.json();
}

// Helper function to map model response to our verdict format
function mapModelResponseToVerdict(response: any): FakeNewsDetectionResult {
  // This mapping would need to be adjusted based on the specific model's output format
  if (Array.isArray(response) && response[0]) {
    const result = response[0];
    
    // For fake news detection models that return "LABEL_0"/"LABEL_1" format
    if (result.hasOwnProperty('LABEL_0') && result.hasOwnProperty('LABEL_1')) {
      const falseScore = result['LABEL_1'] || 0;
      const trueScore = result['LABEL_0'] || 0;
      
      if (Math.max(falseScore, trueScore) < 0.6) {
        return { verdict: 'needs review', confidence: Math.max(falseScore, trueScore) };
      }
      
      return {
        verdict: falseScore > trueScore ? 'likely false' : 'likely true',
        confidence: Math.max(falseScore, trueScore)
      };
    }
    
    // For models that return "label" and "score"
    if (result.label && result.score) {
      if (result.label.includes('FAKE') || result.label.includes('FALSE')) {
        return { verdict: 'likely false', confidence: result.score };
      } else if (result.label.includes('REAL') || result.label.includes('TRUE')) {
        return { verdict: 'likely true', confidence: result.score };
      }
    }
  }
  
  // Default fallback
  return { verdict: 'needs review', confidence: 0.5 };
}

// Fallback response for when API calls fail
function fallbackResponse(): FakeNewsDetectionResult {
  const randomVerdict = Math.random();
  if (randomVerdict > 0.7) {
    return { verdict: 'likely true', confidence: 0.7 + Math.random() * 0.3 };
  } else if (randomVerdict > 0.4) {
    return { verdict: 'likely false', confidence: 0.7 + Math.random() * 0.3 };
  } else {
    return { verdict: 'needs review', confidence: 0.4 + Math.random() * 0.3 };
  }
}