import { Form, redirect, useNavigation } from "react-router";
import { Route } from "./+types/submit-post-page";

import Hero from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getTopics } from "../queries-community";
import { getLoggedInUserId } from "~/features/users/queries-profiles";
import { z } from "zod";
import { createPost } from "../mutations-community";
import { LoaderCircleIcon } from "lucide-react";
export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "게시물 작성 | writenow",
    },
    {
      name: "description",
      content: "게시물 작성 페이지입니다.",
    },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);

  const topics = await getTopics(client);
  return { topics };
};

const formSchema = z.object({
  title: z
    .string()
    .min(1, "제목을 입력해주세요.")
    .max(30, "제목은 30자 이하로 작성해주세요."),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  content: z
    .string()
    .min(1, "콘텐츠를 입력해주세요.")
    .max(1000, "콘텐츠는 1000자 이하로 작성해주세요."),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);

  const formData = await request.formData();

  const {
    success,
    error,
    data: parsedData,
  } = formSchema.safeParse(Object.fromEntries(formData));

  if (!success) {
    return {
      fieldErrors: error.flatten().fieldErrors,
    };
  }

  const { title, category, content } = parsedData;

  const { post_id } = await createPost(client, {
    title,
    category,
    content,
    userId,
  });

  return redirect(`/community/${post_id}`);
};

export default function SubmitPostPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" ||
    navigation.state === "loading";
  return (
    <div className="space-y-10">
      <Hero
        title="게시물 작성"
        subtitle="게시물 작성 페이지입니다."
      />
      <Form
        method="post"
        className="flex flex-col gap-10 max-w-screen-md mx-auto"
      >
        <InputPair
          label="제목"
          title="제목"
          id="title"
          name="title"
          placeholder="제목을 입력해주세요."
          required
          description="게시물의 제목을 입력해주세요."
        />
        {actionData && "fieldErrors" in actionData && (
          <p className="text-red-500">
            {actionData?.fieldErrors?.title?.join(", ")}
          </p>
        )}
        <SelectPair
          label="카테고리"
          name="category"
          placeholder="카테고리를 선택해주세요."
          required
          description="게시물의 카테고리를 선택해주세요."
          options={loaderData.topics.map((topic) => ({
            label: topic.name,
            value: topic.slug,
          }))}
        />
        {actionData && "fieldErrors" in actionData && (
          <p className="text-red-500">
            {actionData?.fieldErrors?.category?.join(", ")}
          </p>
        )}
        <InputPair
          label="콘텐츠"
          title="콘텐츠"
          id="content"
          name="content"
          placeholder="예) 저는 최근에 Notion을 사용하고 있는데, 다른 노트 앱을 추천해주실 수 있나요? 특히 마크다운 지원이 잘 되는 앱을 찾고 있습니다."
          required
          description="1,000자 이내로 작성해주세요."
          textarea
        />
        {actionData && "fieldErrors" in actionData && (
          <p className="text-red-500">
            {actionData?.fieldErrors?.content?.join(", ")}
          </p>
        )}
        <Button
          type="submit"
          className="w-1/3 mx-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            "게시물 작성"
          )}
        </Button>
      </Form>
    </div>
  );
}
