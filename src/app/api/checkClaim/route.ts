import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { claim, url } = await request.json();
    
    if (!claim && !url) {
      return NextResponse.json(
        { error: 'Claim or URL is required' },
        { status: 400 }
      );
    }
    
    // Call Hugging Face model for fake news detection
    const huggingFaceResponse = await fetch(
      "https://api-inference.huggingface.co/models/jy46604790/Fake-News-Bert-Detect",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: claim }),
      }
    );
    
    if (!huggingFaceResponse.ok) {
      throw new Error(`Hugging Face API error: ${huggingFaceResponse.status}`);
    }
    
    const modelResult = await huggingFaceResponse.json();
    console.log('Hugging Face model result:', modelResult);
    
    // Process the result
    // LABEL_0 means fake news, LABEL_1 means real news
    const isFake = modelResult[0][0].label === "LABEL_0";
    const confidence = modelResult[0][0].score;
    
    const verdict = isFake ? 'likely false' : 'likely true';
    const explanation = isFake 
      ? 'Our AI model has detected patterns consistent with fake news in this claim.'
      : 'Our AI model has detected patterns consistent with reliable information in this claim.';
    
    return NextResponse.json({
      verdict,
      confidence,
      explanation,
      sources: [
        {
          name: 'Fake News BERT Detection Model',
          url: 'https://huggingface.co/jy46604790/Fake-News-Bert-Detect'
        }
      ]
    });
    
  } catch (error) {
    console.error('Error checking claim:', error);
    return NextResponse.json(
      { error: 'Failed to check claim' },
      { status: 500 }
    );
  }
}