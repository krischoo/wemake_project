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
          "웹 검색을 통해, 오늘 많은 사람들이 관심을 갖고 있는 최신 뉴스를 10개 만들어",
      },
      {
        role: "assistant",
        content: "최신 뉴스를 10개 만들어",
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
