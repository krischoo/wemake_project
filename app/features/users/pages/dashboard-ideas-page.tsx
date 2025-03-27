import { IdeaCard } from "~/features/ideas/components/idea-card";
import { Route } from "./+types/dashboard-ideas-page";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "../queries-profiles";
import { getClaimedIdeas } from "~/features/ideas/queries-ideas";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "아이디어 페이지 | writenow",
    },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const ideas = await getClaimedIdeas(client, userId);
  return { ideas };
};

export default function DashboardIdeasPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold mb-10 pb-4 sticky top-0 bg-white">
        수집한 아이디어
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            id={idea.gpt_idea_id}
            title={idea.idea}
            claimedAt={idea.claimed_at}
            owner={true}
          />
        ))}
      </div>
    </div>
  );
}
