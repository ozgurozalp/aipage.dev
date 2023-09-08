import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { NextResponse } from "next/server";
import { prompts } from "@/constants";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      prompt: string;
    };
  },
) {
  const { content } = await req.json();

  const systemPrompt = prompts[params.prompt];

  if (!systemPrompt) {
    return NextResponse.json({ message: "prompt not found" }, { status: 404 });
  }

  const messages: ChatCompletionRequestMessage[] = [
    { role: "user", content },
    { role: "system", content: systemPrompt },
  ];

  /*
  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo-16k",
    messages,
    stream: false,
  });

   */

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-16k",
      messages,
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: response.statusText,
        },
        {
          status: response.status,
        },
      );
    } else {
      const result = await response.json();
      return NextResponse.json(JSON.parse(result.choices[0].message.content));
    }
  } catch (error) {
    NextResponse.json({ error }, { status: 500 });
  }
}
