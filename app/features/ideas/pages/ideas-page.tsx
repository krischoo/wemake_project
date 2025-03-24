import { Route } from "./+types/ideas-page";
import Hero from "~/common/components/hero";
import { IdeaCard } from "../components/idea-card";
import { getGptIdeas } from "../queries-ideas";
import { makeSSRClient } from "~/supa-client";
export const meta: Route.MetaFunction = () => {
  return [
    { title: "Ideas | WriteNow" },
    { name: "description", content: "Ideas" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const ideas = await getGptIdeas(client, { limit: 15 });
  return { ideas };
};

export default function IdeasPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="IdeasGPT" subtitle="Find your next idea" />
      <div className="grid grid-cols-3 gap-4">
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            id={idea.gpt_idea_id}
            title={idea.idea}
            viewCount={idea.views}
            likeCount={idea.likes}
            postedAt={idea.created_at}
            claimed={idea.is_claimed}
          />
        ))}
      </div>
    </div>
  );
}
