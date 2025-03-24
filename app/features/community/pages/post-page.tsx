import { Form, Link } from "react-router";
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

export default function PostPage({
  loaderData,
}: Route.ComponentProps) {
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

                <Button
                  variant="outline"
                  className="flex flex-col h-14"
                >
                  <ChevronUpIcon className="size-4 shrink-0" />
                  <span>{loaderData.post.upvotes}</span>
                </Button>
              </div>

              <p className="text-base leading-relaxed">
                {loaderData.post.content}
              </p>
            </article>
          </section>

          {/* 댓글 작성 창 */}
          <section className="flex gap-2 w-3/4">
            <Avatar className="size-12">
              <AvatarFallback>N</AvatarFallback>
              <AvatarImage src="https://github.com/krischoo.png" />
            </Avatar>

            <Form className="flex flex-col gap-2 w-full items-end">
              <Textarea
                placeholder="댓글을 입력하세요"
                className="resize-none w-full"
                rows={10}
              />
              <Button type="submit">댓글 작성하기</Button>
            </Form>
          </section>

          {/* 댓글 목록 */}
          <section className="space-y-5 w-3/4">
            <h4 className="text-lg font-medium">댓글 목록</h4>

            <div>
              {/* 댓글 개별 아이템 */}
              <div className="space-y-10">
                {loaderData.replies.map((reply) => (
                  <Reply
                    key={reply.reply_id}
                    username={reply.user.name}
                    avatarUrl={reply.user.avatar}
                    content={reply.reply}
                    postedAt={reply.created_at}
                    topLevel={true}
                    replies={
                      reply.post_replies ? [reply.post_replies] : []
                    }
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
