import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { NextResponse } from "next/server";
import { prompts } from "@/constants";
import { OpenAIStream, StreamingTextResponse } from "ai";

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
  const { messages } = await req.json();

  const systemPrompt = prompts[params.prompt];

  if (!systemPrompt) {
    return NextResponse.json({ message: "prompt not found" }, { status: 404 });
  }

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    messages: [...messages, { role: "system", content: systemPrompt }].map(
      (message: any) => ({
        role: message.role,
        content: message.content,
      }),
    ),
    stream: true,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
