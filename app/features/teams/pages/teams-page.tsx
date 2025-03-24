import Hero from "~/common/components/hero";
import { Route } from "./+types/teams-page";
import { TeamCard } from "../components/team-card";
import { getTeams } from "../queries-teams";
import { makeSSRClient } from "~/supa-client";

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

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const teams = await getTeams(client, { limit: 5 });
  return { teams };
};

export default function TeamsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="팀 목록" subtitle="모집 중인 팀을 확인해보세요." />

      <div className="grid grid-cols-3 gap-4">
        {loaderData.teams.map((team) => (
          <TeamCard
            key={team.team_id}
            id={team.team_id}
            leaderUsername={team.team_leader_id.name}
            leaderAvatarUrl={team.team_leader_id.avatar}
            positions={team.roles.split(",")}
            projectTitle={team.product_description}
          />
        ))}
      </div>
    </div>
  );
}
