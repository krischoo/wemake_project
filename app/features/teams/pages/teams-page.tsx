import Hero from "~/common/components/hero";
import { Route } from "./+types/teams-page";
import { TeamCard } from "../components/team-card";

export const meta: Route.MetaFunction = () => {
	return [
		{
			title: "팀 목록 | writenow",
		},
		{
			name: "description",
			content: "팀 목록",
		},
	];
};

export default function TeamsPage() {
	return (
		<div className="space-y-10">
			<Hero title="팀 목록" subtitle="모집 중인 팀을 확인해보세요." />

			<div className="grid grid-cols-3 gap-4">
				{Array.from({ length: 5 }).map((_, index) => (
					<TeamCard
						key={`teamId-${index}`}
						id={`teamId-${index}`}
						leaderUsername="Lynn"
						leaderAvatarUrl="https://github.com/inthetiger.png"
						positions={[
							"React Developer",
							"Backend Developer",
							"Product Manager",
						]}
						projectTitle="a new social media platform"
					/>
				))}
			</div>
		</div>
	);
}
