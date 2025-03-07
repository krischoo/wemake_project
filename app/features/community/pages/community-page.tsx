import Hero from "~/common/components/hero";
import { Route } from "./+types/community-page";
import { Link } from "react-router";
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
export const meta: Route.MetaFunction = () => {
	return [
		{ title: "커뮤니티 | writenow" },
		{ name: "description", content: "커뮤니티 페이지입니다." },
	];
};

export default function CommunityPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const sorting = searchParams.get("sorting") || "newest";
	const period = searchParams.get("period") || "all";
	return (
		<div>
			<Hero title="커뮤니티 페이지" subtitle="커뮤니티 페이지입니다." />
			<div className="grid grid-cols-6 items-start gap-40">
				{/* 메인 콘텐츠 (좌측) */}
				<main className="col-span-4 space-y-10">
					<section className="flex justify-between items-end">
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
									name="search"
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
						{Array.from({ length: 5 }).map((_, index) => (
							<PostCard
								key={`postId-${index}`}
								id={`postId-${index}`}
								title="What is best writing app?"
								author="Kris"
								authorAvatarUrl="https://github.com/apple.png"
								category="Productivity"
								createdAt="2 hours ago"
								expanded={true}
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
						{[
							"AI Tools",
							"Note Taking Apps",
							"Productivity Tools",
							"Writing Tools",
							"Other",
						].map((category) => (
							<Button variant="link" key={category} asChild className="pl-0">
								<Link
									to={`/community?topic=${category}`}
									className="text-sm font-semibold text-muted-foreground hover:text-foreground"
								>
									{category}
								</Link>
							</Button>
						))}
					</div>
				</aside>
			</div>
		</div>
	);
}
