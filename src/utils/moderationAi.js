/**
 * Thapar Atlas — AI Moderation and Spam Detection Utility
 * Uses Google Gemini 1.5 Flash API via direct REST calls.
 */

export async function checkSubmissionSpam(title, description, fileBase64 = null, fileMimeType = null) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY' || apiKey.startsWith('YOUR_')) {
    // Graceful fallback if no API key is configured
    return {
      isSpam: false,
      reason: 'AI filter skipped (API key not configured)'
    };
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const prompt = `You are an automated spam filter and content moderator for Thapar Atlas, a college student portal.
Analyze the following user-submitted content details (could be study material details, user feedback/bug reports, and optionally an attached PDF/image file).
Determine if the content is spam, gibberish (keyboard mash), promotional spam, offensive/inappropriate, completely unrelated nonsense, or mock dummy test data (like "asdasd", "test123", "hello hello").
If a PDF/file is attached, check its actual internal content to verify if it matches the metadata or if it is junk/irrelevant nonsense.

Title: "${title || ''}"
Description: "${description || ''}"

Respond in JSON format with this exact structure:
{
  "isSpam": true or false,
  "reason": "A brief 1-sentence explanation of your decision"
}`;

    const parts = [
      {
        text: prompt
      }
    ];

    if (fileBase64 && fileMimeType) {
      const rawBase64 = fileBase64.includes(';base64,')
        ? fileBase64.split(';base64,')[1]
        : fileBase64;
      
      parts.push({
        inline_data: {
          mime_type: fileMimeType,
          data: rawBase64
        }
      });
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: parts
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      throw new Error('Empty response from Gemini API');
    }

    const result = JSON.parse(responseText.trim());
    return {
      isSpam: !!result.isSpam,
      reason: result.reason || 'Decision reached by AI moderation'
    };
  } catch (error) {
    console.error('AI Spam filter error:', error);
    // Return safe default (allow moderation queue review) on AI service failure
    return {
      isSpam: false,
      reason: `AI check failed: ${error.message}`
    };
  }
}

/**
 * Verifies student ID card matches profile details.
 */
export async function verifyStudentIdCard(studentDetails, fileBase64, fileMimeType) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY' || apiKey.startsWith('YOUR_')) {
    return {
      verified: false,
      reason: 'AI filter skipped (API key not configured)'
    };
  }

  if (!fileBase64 || !fileMimeType) {
    return {
      verified: false,
      reason: 'No ID card image uploaded'
    };
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const prompt = `You are an AI registrar assistant for Thapar Institute of Engineering and Technology.
Verify if the uploaded image is a valid Thapar student ID card, and check if the details on it match the user's input profile:

Name: "${studentDetails.name || ''}"
Roll Number: "${studentDetails.rollNumber || ''}"
Branch: "${studentDetails.branch || ''}"

Analyze the image carefully.
Respond in JSON format with this exact structure:
{
  "verified": true or false,
  "reason": "A brief explanation of your decision (e.g. details match, image blur, incorrect ID card)"
}`;

    const parts = [
      { text: prompt }
    ];

    const rawBase64 = fileBase64.includes(';base64,')
      ? fileBase64.split(';base64,')[1]
      : fileBase64;
    
    parts.push({
      inline_data: {
        mime_type: fileMimeType,
        data: rawBase64
      }
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: parts
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      throw new Error('Empty response from Gemini API');
    }

    const result = JSON.parse(responseText.trim());
    return {
      verified: !!result.verified,
      reason: result.reason || 'Verification complete'
    };
  } catch (error) {
    console.error('AI ID verification error:', error);
    return {
      verified: false,
      reason: `AI check failed: ${error.message}`
    };
  }
}
