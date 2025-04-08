import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { insertIdeas } from "../mutations-ideas";
import { adminClient } from "~/supa-client";
import { Route } from "./+types/generate-idea-page";
const openai = new OpenAI();

const ideaSchema = z.object({
  title: z.string(),
  description: z.string({
    description: "아이디어 설명, 최대 30자, 단어 형식으로 끝마침",
  }),
  category: z.enum(["생산성", "자기관리", "기록", "기타"]),
  solution: z.string(),
  spendTime: z.number(),
});

const responseSchema = z.object({
  ideas: z.array(ideaSchema),
});

export const action = async ({ request }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    return new Response(null, { status: 404 });
  }
  const header = request.headers.get("X-EGG");
  if (!header || header !== "Y-SALAD") {
    return new Response(null, { status: 404 });
  }

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content:
          "웹앱으로 만들 수 있는 기가막힌 아이디어 설명, 스마트폰 보다는 책상에 앉아서 PC를 사용하는 사람들을 위한 웹사이트, 추후에 수익화도 실현할 수 있도록",
      },
      {
        role: "assistant",
        content: "실행 가능한 아이디어 10개 만들어",
      },
    ],
    response_format: zodResponseFormat(responseSchema, "ideas"),
  });
  const descriptions =
    completion.choices[0].message.parsed?.ideas.map(
      (idea) => idea.description
    );

  if (!descriptions) {
    return Response.json(
      { error: "No descriptions" },
      { status: 400 }
    );
  }

  await insertIdeas(adminClient, descriptions);
  return Response.json({ ok: true });
};
