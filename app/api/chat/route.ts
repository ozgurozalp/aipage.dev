import { Configuration, OpenAIApi } from "openai-edge";
import { Ratelimit } from "@upstash/ratelimit";
import redis from "../../../utils/redis";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { headers, cookies } from "next/headers";
import { NextResponse } from "next/server";

/* // REMOVE THIS IF YOU DON'T WANT RATE LIMITING
// START
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(5, "1440 m"),
      analytics: true,
    })
  : undefined;

// END
 */
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
  const cookieStore = cookies();
  /*   // REMOVE THIS IF YOU DON'T WANT RATE LIMITING
  // START
  if (ratelimit) {
    const headersList = headers();
    const ipIdentifier = headersList.get("x-real-ip");

    const result = await ratelimit.limit(ipIdentifier ?? "");

    if (!result.success) {
      const fakeStream =
        "Too many requests in 1 day. Please try again in a 24 hours. Thank you. 🙏";
      return new Response(fakeStream, {
        status: 429,
        headers: {
          "X-RateLimit-Limit": result.limit,
          "X-RateLimit-Remaining": result.remaining,
        } as any,
      });
    }
  }
  // END */

  const { messages } = await req.json();

  // Implemented for to test the API

  const sessionToken = cookieStore.get("sessionToken")?.value as string;

  const storeMessage = await fetch(
    "https://c3-na.altogic.com/e:64d52ccfc66bd54b97bdd78a/test",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Session: sessionToken,
      },
      body: JSON.stringify({ content: messages[0].content }),
    },
  );

  const { credits } = await storeMessage.json();

  if (credits === 0) {
    return NextResponse.json({ code: "no-credits", credits });
  }

  const systemPrompt = `You are a talented UI designer who specializes in creating structured content for landing pages. Your task is to generate a JSON object that outlines the content for each section of a landing page. The JSON object should be organized as follows:

1. Header Section: Create a JSON object named "header" with keys for "logo" and "navigationMenuItems" (an array of menu items).

2. Hero Section: Create a JSON object named "hero" with keys for "title", "description", "jumbotron" (background image description), and "cta" (call-to-action text).

3. Feature Section: Create a JSON object named "features" with keys for "feature_1", "feature_2", and "feature_3". Each feature should be a nested object with keys for "title", "icon", and "description".

4. Individual Feature Sections: Create a JSON object named "individualFeatures" with keys for "feature_1", "feature_2", and "feature_3". Each feature should be a nested object with keys for "title", "description", "cta", and "backgroundImageDescription".

5. Testimonial Section: Create a JSON object named "testimonials" with keys for "testimonial_1" and "testimonial_2". Each testimonial should be a nested object with keys for "name", "role", and "feedback".

6. Blog Section: Create a JSON object named "blog" with keys for "post_1", "post_2", and "post_3". Each post should be a nested object with keys for "title" and "shortDescription".

7. FAQ Section: Create a JSON object named "faq" with keys for "question_1", "question_2", etc. Each question should be a nested object with keys for "question" and "answer".

8. Team Section: Create a JSON object named "team" with keys for "member_1", "member_2", "member_3", etc. Each member should be a nested object with keys for "name", "role", and "socialMediaLinks" (an array of social media platforms).

9. Newsletter Subscription: Create a JSON object named "newsletter" with keys for "title" and "cta".

10. Contact Form: Create a JSON object named "contactForm" with keys for "nameField", "emailField", and "messageField".

11. Map Section: Create a JSON object named "map" with keys for "locationDescription" and "googleMapsAPIKey".

12. Footer Section: Create a JSON object named "footer" with keys for "socialMediaLinks" (an array of social media platforms).

Please ensure that each key-value pair contains only text. Format the JSON object for readability.`;

  const combinedMessages = [
    ...messages,
    { role: "system", content: systemPrompt },
  ];

  let response;
  let stream;

  response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    messages: combinedMessages.map((message: any) => ({
      role: message.role,
      content: message.content,
    })),
    stream: true,
  });

  stream = OpenAIStream(response);
  // Continue generating the response if incomplete

  // If rate limited, return a fake response
  return new StreamingTextResponse(stream);
}
