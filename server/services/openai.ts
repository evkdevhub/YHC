import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface ChatResponse {
  message: string;
  shouldEncourageApplication: boolean;
  suggestedAction?: string;
}

export async function generateChatResponse(userMessage: string): Promise<ChatResponse> {
  try {
    const systemPrompt = `You are a helpful and persuasive recruitment assistant for My Star LLC, a professional trucking company. Your goal is to answer driver questions about pay, benefits, routes, home time, and requirements while encouraging them to apply or visit our office.

Key Information:
- Pay: 52¢-62¢ per mile, $1,400 weekly guarantee, up to $15,000 sign-on bonus
- Home Time: 34-hour reset weekly or 4 days home every 2 weeks (guaranteed)
- Requirements: CDL-A, 23+ years old, 6+ months OTR experience, clean MVR
- Benefits: Full medical/dental/vision, 401K with 4% match, paid vacation
- Equipment: Late-model Freightliner and Peterbilt trucks with APUs
- Freight: Primarily drop-and-hook, no-touch dry van freight

Always be encouraging and professional. If someone asks about specific details, provide accurate information and then encourage them to apply or call 1-800-MYSTAR1.

Respond in JSON format with: {"message": "your response", "shouldEncourageApplication": true/false, "suggestedAction": "apply_now" or "call_now" or null}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      response_format: { type: "json_object" },
      max_tokens: 300
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      message: result.message || "Thanks for your question! Please call us at 1-800-MYSTAR1 for personalized assistance.",
      shouldEncourageApplication: result.shouldEncourageApplication || true,
      suggestedAction: result.suggestedAction || null
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      message: "Thanks for your question! Our recruiters are standing by to help. Call us at 1-800-MYSTAR1 or apply online to get started with My Star LLC today!",
      shouldEncourageApplication: true,
      suggestedAction: "call_now"
    };
  }
}
