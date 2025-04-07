import Hero from "~/common/components/hero";
import { Route } from "./+types/community-page";
import { Await, data, Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "~/common/components/ui/dropdown-menu";
import { ChevronDownIcon, MenuIcon } from "lucide-react";
import { SORT_OPTIONS, PERIOD_OPTIONS } from "../constants-community";
import { useSearchParams } from "react-router";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { PostCard } from "../components/post-card";
import { getTopics, getPosts } from "../queries-community";
import { Suspense } from "react";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
export const meta: Route.MetaFunction = () => {
  return [
    { title: "커뮤니티 | writenow" },
    { name: "description", content: "커뮤니티 페이지입니다." },
  ];
};

export const searchParamsSchema = z.object({
  sorting: z.enum(["newest", "popular"]).optional().default("newest"),
  period: z.enum(PERIOD_OPTIONS).optional().default("all"),
  keyword: z.string().optional(),
  topic: z.string().optional(),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw data(
      {
        error_code: "INVALID_SEARCH_PARAMS",
        error_message: "Invalid search params",
      },
      { status: 400 }
    );
  }

  const [topics, posts] = await Promise.all([
    getTopics(client),
    getPosts(client, {
      limit: 5,
      sorting: parsedData.sorting,
      period: parsedData.period,
      keyword: parsedData.keyword,
      topic: parsedData.topic,
    }),
  ]);

  return { topics, posts };
};

export default function CommunityPage({
  loaderData,
}: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";
  const period = searchParams.get("period") || "all";
  return (
    <div>
      <Hero
        title="커뮤니티 페이지"
        subtitle="커뮤니티 페이지입니다."
      />
      <div className="grid grid-cols-6 items-start gap-40">
        {/* 메인 콘텐츠 (좌측) */}
        <main className="col-span-4 space-y-10">
          <section className="flex  justify-between items-end">
            <div className="space-y-6 w-full">
              {/* 드롭다운 메뉴 */}
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2">
                    <span className="capitalize text-sm font-semibold">
                      {sorting}
                    </span>
                    <ChevronDownIcon className="size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {SORT_OPTIONS.map((option) => (
                      <DropdownMenuCheckboxItem
                        key={option}
                        className="capitalize cursor-pointer"
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            searchParams.set("sorting", option);
                            setSearchParams(searchParams);
                          }
                        }}
                      >
                        {option}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {sorting === "popular" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2">
                      <span className="capitalize text-sm font-semibold">
                        {period}
                      </span>
                      <ChevronDownIcon className="size-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {PERIOD_OPTIONS.map((option) => (
                        <DropdownMenuCheckboxItem
                          key={option}
                          className="capitalize cursor-pointer"
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              searchParams.set("period", option);
                              setSearchParams(searchParams);
                            }
                          }}
                        >
                          {option}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              {/* 게시물 검색 */}
              <Form className="w-1/2">
                <Input
                  type="search"
                  name="keyword"
                  placeholder="검색어를 입력해주세요."
                />
              </Form>
            </div>
            <Button className="bottom-0" asChild>
              <Link to="/community/submit">게시물 작성</Link>
            </Button>
          </section>

          {/* 게시물 리스트 */}

          <section className="space-y-5">
            {loaderData.posts.map((post) => (
              <PostCard
                key={post.post_id}
                id={post.post_id}
                title={post.title}
                author={post.author_name}
                authorAvatarUrl={post.author_avatar}
                category={post.topic_name}
                createdAt={post.created_at}
                expanded={true}
                upvoteCount={post.upvotes}
                isUpvoted={post.is_upvoted}
              />
            ))}
          </section>
        </main>

        {/* 사이드바 (우측) - 카테고리 리스트 */}
        <aside className="col-span-2 space-y-4">
          <span className="text-lg font-bold text-muted-foreground uppercase">
            Topics
          </span>

          <div className="flex flex-col gap-2 items-start">
            {loaderData.topics.map((topic) => (
              <Button
                variant="link"
                key={topic.slug}
                asChild
                className="pl-0"
              >
                <Link
                  to={`/community?topic=${topic.slug}`}
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  {topic.name}
                </Link>
              </Button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
