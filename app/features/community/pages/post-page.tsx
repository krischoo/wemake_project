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
import { ChevronUpIcon, DotIcon, MessageCircleIcon } from "lucide-react";
import { Textarea } from "~/common/components/ui/textarea";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import Reply from "../components/reply";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "커뮤니티 게시물 | writenow" },
		{ name: "description", content: "커뮤니티 게시물 페이지입니다." },
	];
};

export default function PostPage() {
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
								<Link to="/community?topic=book">책추천</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link to="/community/postId">
									새로운 일에 도전할 때 읽으면 좋은 책
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
										최고의 생산성 도구는 무엇일까?
									</h2>
									<div className="flex items-center gap-1 text-sm text-muted-foreground">
										<span>@작성자</span>
										<DotIcon className="size-4" />
										<span>12시간 전</span>
										<DotIcon className="size-4" />
										<span>10개의 댓글</span>
									</div>
								</div>

								<Button variant="outline" className="flex flex-col h-14">
									<ChevronUpIcon className="size-4 shrink-0" />
									<span>10</span>
								</Button>
							</div>

							<p className="text-base leading-relaxed">
								안녕하세요! 저는 최근에 프리랜서로 전향한 개발자입니다. 혼자
								일하다 보니 시간 관리와 업무 효율성이 정말 중요해졌는데요. 특히
								여러 프로젝트를 동시에 진행하면서 마감일을 지키고,
								클라이언트와의 소통도 원활하게 해야 하는 상황입니다. 현재는
								노션으로 모든 걸 관리하고 있지만, 더 효율적인 도구가 있을 것
								같아서 여러분의 추천을 받고 싶습니다. 업무 시간 추적, 프로젝트
								관리, 할 일 목록 등을 한 번에 관리할 수 있는 최적의 도구는
								무엇일까요?
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

						{/* 댓글 목록 */}
						<div>
							{/* 댓글 개별 아이템 */}
							<div>
								<Reply
									username="작성자"
									avatarUrl="https://github.com/krischoo.png"
									content="프리랜서 업무 관리를 위해서는 Trello와 Toggl의 조합을 추천드립니다. Trello로 프로젝트별 칸반 보드를 만들어 태스크를 관리하고, Toggl로 시간 추적을 하면 효율적입니다. 저도 처음에는 노션만 사용했는데, 이 조합으로 바꾼 뒤 생산성이 많이 올랐어요. 특히 Toggl의 리포트 기능으로 어떤 작업에 시간이 많이 소요되는지 파악할 수 있어서 좋더라구요. 클라이언트와의 소통은 Slack을 따로 사용하시는 것도 추천드립니다."
									postedAt="12시간 전"
									topLevel={true}
								/>
							</div>

							{/* 추가 댓글 예시 */}
							<div className="mt-6">
								<Reply
									username="개발자"
									avatarUrl="https://github.com/devkim.png"
									content="저는 Notion과 GitHub Projects를 연동해서 사용하고 있어요. 특히 API 개발 작업에서는 Postman으로 API 문서화도 함께하면 효율적입니다."
									postedAt="8시간 전"
									topLevel={true}
								/>
							</div>
						</div>
					</section>
				</main>
				<aside className="col-span-2 border rounded-lg shadow-sm p-6 space-y-5">
					<div className="flex  gap-5">
						{/* 게시물 작성자 */}
						<Avatar className="size-12">
							<AvatarFallback>N</AvatarFallback>
							<AvatarImage src="https://github.com/krischoo.png" />
						</Avatar>
						<div className="flex flex-col">
							<h4 className="text-lg font-medium">Kris</h4>
							<Badge variant="secondary">프리랜서</Badge>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<span>📚 5권의 책을 읽었습니다</span>
						<span>💬 10권의 책을 추천했습니다</span>
					</div>
					<Button variant="outline" className="w-full">
						팔로우
					</Button>
				</aside>
			</div>
		</>
	);
}
