import {
  Form,
  Link,
  useFetcher,
  useOutletContext,
} from "react-router";
import { Route } from "./+types/post-page";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "~/common/components/ui/breadcrumb";
import { Button } from "~/common/components/ui/button";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import { Textarea } from "~/common/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import Reply from "../components/reply";
import { getPostById, getReplies } from "../queries-community";
import { DateTime } from "luxon";
import { Separator } from "~/common/components/ui/separator";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries-profiles";
import { z } from "zod";
import { createReply } from "../mutations-community";
import { useEffect, useRef } from "react";
import { cn } from "~/lib/utils";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "커뮤니티 게시물 | writenow" },
    { name: "description", content: "커뮤니티 게시물 페이지입니다." },
  ];
};

export const loader = async ({
  params,
  request,
}: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const post = await getPostById(client, Number(params.postId));
  const replies = await getReplies(client, Number(params.postId));

  return { post, replies };
};

const formSchema = z.object({
  reply: z.string().min(1),
  parentId: z.coerce.number().optional(),
});

export const action = async ({
  request,
  params,
}: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return {
      fieldErrors: error.flatten().fieldErrors,
    };
  }
  const { reply, parentId } = data;
  await createReply(client, {
    reply,
    postId: Number(params.postId),
    userId,
    parentId,
  });
  return { success: true };
};

export default function PostPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const fetcher = useFetcher();

  const { isLoggedIn, name, username, avatar } = useOutletContext<{
    isLoggedIn: boolean;
    name?: string;
    username?: string;
    avatar?: string;
  }>();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
    }
  }, [actionData?.success]);
  return (
    <>
      <header className="mb-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/community">커뮤니티</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  to={`/community?topic=${loaderData.post.topic_slug}`}
                >
                  {loaderData.post.topic_name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/community/${loaderData.post.post_id}`}>
                  {loaderData.post.title}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="grid grid-cols-6 gap-20 items-start">
        <main className="col-span-4 space-y-10 pl-10">
          <section className="flex flex-col w-full items-start">
            {/* 게시물 콘텐츠 */}
            <article className="space-y-10 w-3/4">
              <div className="flex items-center justify-between w-full pr-5">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-bold">
                    {loaderData.post.title}
                  </h2>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span>{loaderData.post.author_name}</span>
                    <DotIcon className="size-4" />
                    <span>
                      {DateTime.fromISO(
                        loaderData.post.created_at
                      ).toRelative()}
                    </span>
                    <DotIcon className="size-4" />
                    <span>
                      {loaderData.post.replies_count}개의 댓글
                    </span>
                  </div>
                </div>

                <fetcher.Form
                  method="post"
                  action={`/community/${loaderData.post.post_id}/upvote`}
                >
                  {/* Upvote 추천 버튼 */}
                  <Button
                    variant="outline"
                    className={cn(
                      "flex flex-col h-14",
                      loaderData.post.is_upvoted &&
                        "border-primary border-2 font-bold text-primary"
                    )}
                  >
                    <ChevronUpIcon className="size-4 shrink-0" />
                    <span>{loaderData.post.upvotes}</span>
                  </Button>
                </fetcher.Form>
              </div>

              <p className="text-base leading-relaxed">
                {loaderData.post.content}
              </p>
            </article>
          </section>

          {/* 댓글 작성 창 */}
          {isLoggedIn ? (
            <section className="flex gap-2 w-3/4">
              <Avatar className="size-12">
                {avatar ? (
                  <AvatarImage src={avatar} />
                ) : (
                  <AvatarFallback>{name?.[0]}</AvatarFallback>
                )}
              </Avatar>

              <Form
                ref={formRef}
                method="post"
                className="flex flex-col gap-2 w-full items-end"
              >
                <Textarea
                  name="reply"
                  placeholder="댓글을 입력하세요"
                  className="resize-none w-full"
                  rows={10}
                />
                <Button type="submit">댓글 작성하기</Button>
              </Form>
            </section>
          ) : (
            <div className="flex flex-col gap-2 w-full items-center">
              <p>로그인 후 댓글을 작성할 수 있습니다.</p>
              <Button variant="outline" asChild>
                <Link to="/auth/login">로그인</Link>
              </Button>
            </div>
          )}

          {/* 댓글 목록 */}
          <section className="space-y-5 w-3/4">
            <h4 className="text-lg font-medium">댓글 목록</h4>

            <div>
              {/* 댓글 개별 아이템- 대댓글 포함 묶음) */}
              <div className="space-y-10">
                {loaderData.replies.map((reply) => (
                  <Reply
                    name={reply.user.name}
                    username={reply.user.username}
                    avatarUrl={reply.user.avatar}
                    content={reply.reply}
                    postedAt={reply.created_at}
                    topLevel={true}
                    parentId={reply.reply_id}
                    childReplies={reply.children ?? []} // props 전달
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
        <aside className="col-span-2 border rounded-lg shadow-sm p-6 space-y-5">
          <div className="flex  gap-5">
            {/* 게시물 작성자 */}
            <Avatar className="size-12">
              <AvatarFallback>
                {loaderData.post.author_name[0]}
              </AvatarFallback>
              <AvatarImage
                src={loaderData.post.author_avatar ?? ""}
              />
            </Avatar>
            <div className="flex flex-col items-start">
              <h4 className="text-lg font-medium">
                {loaderData.post.author_name}
              </h4>
              <Badge variant="secondary" className="">
                {loaderData.post.author_role}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span>
              🏃‍♀️{" "}
              {DateTime.fromISO(
                loaderData.post.author_created_at
              ).toRelative()}{" "}
              부터 활동 중 입니다
            </span>
            <span>
              📚 {loaderData.post.products_count}권의 책을
              추천했습니다
            </span>
          </div>
          <Button variant="outline" className="w-full">
            팔로우
          </Button>
        </aside>
      </div>
    </>
  );
}
