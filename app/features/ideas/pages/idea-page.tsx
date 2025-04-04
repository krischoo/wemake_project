import { Route } from "./+types/idea-page";
import Hero from "~/common/components/hero";
import { EyeIcon, DotIcon, HeartIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { getGptIdea } from "../queries-ideas";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries-profiles";
import { Form, redirect } from "react-router";
import { claimIdea } from "../mutations-ideas";

export const meta = ({ data }: Route.MetaArgs) => {
  return [
    { title: `Idea #${data.idea.gpt_idea_id} | WriteNow` },
    { name: "description", content: "Idea" },
  ];
};

export const loader = async ({
  params,
  request,
}: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const idea = await getGptIdea(client, Number(params.ideaId));
  if (idea.is_claimed) {
    throw redirect(`/ideas`);
  }
  return { idea };
};

export const action = async ({
  params,
  request,
}: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const idea = await getGptIdea(client, Number(params.ideaId));
  if (idea.is_claimed) {
    return { ok: false };
  }
  await claimIdea(client, Number(params.ideaId), userId);
  return redirect(`/my/dashboard/ideas`);
};

export default function IdeaPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div>
      <Hero title={`Idea #${loaderData.idea.gpt_idea_id}`} />
      <div className="flex flex-col gap-10 items-center max-w-screen-sm mx-auto">
        <p className="italic text-center">{loaderData.idea.idea}</p>
        <div className="flex gap-2 text-sm">
          <div className="flex items-center gap-2">
            <EyeIcon className="w-4 h-4" />
            <span>{loaderData.idea.views}</span>

            <DotIcon className="w-4 h-4" />
            <span>
              {DateTime.fromISO(
                loaderData.idea.created_at
              ).toRelative()}
            </span>
            <DotIcon className="w-4 h-4" />
            <Button variant="outline" className="text-sm px-2">
              <HeartIcon className="w-4 h-4" />
              <span>{loaderData.idea.likes}</span>
            </Button>
          </div>
        </div>
        {!loaderData.idea.is_claimed && (
          <Form method="post">
            <Button size="lg" className="">
              아이디어 선점하기 &rarr;
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
}
