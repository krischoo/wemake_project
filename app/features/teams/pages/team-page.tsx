import { Form } from "react-router";
import { Route } from "./+types/team-page";
import Hero from "~/common/components/hero";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/common/components/ui/card";

export const meta: Route.MetaFunction = () => {
	return [
		{
			title: "팀 페이지 | writenow",
		},
	];
};
export default function TeamPage() {
	return (
		<div className="space-y-10">
			<Hero title="팀에 합류하기" subtitle="팀 페이지입니다." />
			<div className="grid grid-cols-6 gap-10 items-start">
				<main className=" col-span-4 grid grid-cols-4 gap-5">
					{[
						{
							title: "추천하는 책",
							value: "듀얼 브레인",
						},
						{
							title: "팀 인원",
							value: 5,
						},
						{
							title: "모집 포지션",
							value: 3,
						},
						{
							title: "예상 기간",
							value: "3개월",
						},
					].map((item) => (
						<Card>
							<CardHeader>
								<CardTitle className="text-sm font-edium text-muted-foreground">
									{item.title}
								</CardTitle>
								<CardContent className="p-0 text-2xl font-bold">
									<p>{item.value}</p>
								</CardContent>
							</CardHeader>
						</Card>
					))}
					<Card className="col-span-2">
						<CardHeader>
							<CardTitle className="text-sm font-edium text-muted-foreground">
								찾는 일자리
							</CardTitle>
							<CardContent className="p-0 text-xl font-bold flex flex-wrap gap-2">
								<ul className="list-disc list-inside">
									{[
										"React Developer",
										"Python Developer",
										"Product Manager",
										"UI/UX Designer",
										"Data Engineer",
										"Security Engineer",
									].map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</CardContent>
						</CardHeader>
					</Card>
					<Card className="col-span-2">
						<CardHeader>
							<CardTitle className="text-sm font-edium text-muted-foreground">
								프로젝트 아이디어
							</CardTitle>
							<CardContent className="p-0 text-xl font-bold flex flex-wrap gap-2">
								<p>
									SNS의 새로운 패러다임을 제시하는 소셜 미디어 플랫폼을
									개발하고자 합니다. 기존 SNS의 단점을 보완하고 사용자 중심의
									새로운 기능들을 도입하여, 더 건강하고 의미있는 소통이 가능한
									플랫폼을 만들어보고 싶습니다. 주요 기능으로는 AI 기반 콘텐츠
									필터링, 실시간 번역 채팅, 관심사 기반 커뮤니티 매칭 등이
									있습니다.
								</p>
							</CardContent>
						</CardHeader>
					</Card>
				</main>
				<aside className="col-span-2 border rounded-lg shadow-sm p-6 space-y-5">
					<div className="flex  gap-5">
						{/* 게시물 작성자 */}
						<Avatar className="size-12">
							<AvatarFallback>N</AvatarFallback>
							<AvatarImage src="https://github.com/chrisevans.png" />
						</Avatar>
						<div className="flex flex-col">
							<h4 className="text-lg font-medium">Chris Evans</h4>
							<Badge variant="default" className="w-fit">
								백수
							</Badge>
						</div>
					</div>
					<Form className="flex flex-col gap-5 clear-start">
						<InputPair
							label="자기소개 해주세요"
							description="팀에 합류하기 위한 자기소개를 작성해주세요."
							id="introduction"
							name="introduction"
							placeholder="자기소개를 입력해주세요."
							required
							textarea
						/>

						<Button type="submit" className="w-full">
							연락하기
						</Button>
					</Form>
				</aside>
			</div>
		</div>
	);
}
