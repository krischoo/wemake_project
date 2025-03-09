import { IdeaCard } from "~/features/ideas/components/idea-card";
import { Route } from "./+types/dashboard-ideas-page";

export const meta: Route.MetaFunction = () => {
	return [
		{
			title: "아이디어 페이지 | writenow",
		},
	];
};

export default function DashboardIdeasPage() {
	return (
		<div className="space-y-5">
			<h1 className="text-2xl font-semibold mb-10 pb-4 sticky top-0 bg-white">
				수집한 아이디어
			</h1>
			<div className="grid grid-cols-3 gap-4">
				{Array.from({ length: 10 }).map((_, index) => (
					<IdeaCard
						key={`ideaId-${index}`}
						id={`ideaId-${index}`}
						title="AI의 도움을 받아 새로운 제품과 서비스에 대한 아이디어를 발굴하고 검증해보세요. 당신의 아이디어를 더 구체적이고 실현 가능한 형태로 발전시킬 수 있습니다. IdeasGPT는 최신 AI 기술을 활용하여 시장 분석, 사용자 니즈 파악, 비즈니스 모델 구체화까지 도와드립니다. 혁신적인 아이디어가 성공적인 비즈니스로 성장하는 여정을 함께하세요."
						viewCount={100}
						likeCount={100}
						postedAt="12 hours ago"
						claimed={false}
					/>
				))}
			</div>
		</div>
	);
}
