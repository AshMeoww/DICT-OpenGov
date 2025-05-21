import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY;
    const model = process.env.NEXT_PUBLIC_HUGGING_FACE_MODEL;
    
    // Test text for fake news detection
    const testText = "The Philippines has the fastest internet speed in Southeast Asia";
    
    // Call the Hugging Face API
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: testText }),
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({
        success: false,
        error: `API Error: ${response.status} ${response.statusText}`,
        details: errorText,
        apiKey: apiKey ? `${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 5)}` : 'Not found',
        model
      }, { status: response.status });
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      message: 'Hugging Face API is working correctly',
      apiKey: apiKey ? `${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 5)}` : 'Not found',
      model,
      response: data
    });
  } catch (error) {
    console.error('Error testing Hugging Face API:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}