import { makeSSRClient } from "~/supa-client";

import { getLoggedInUserId } from "~/features/users/queries-profiles";
import { toggleUpvote } from "../mutations-community";
import { Route } from "./+types/upvote-post-page";

export const action = async ({
  request,
  params,
}: Route.ActionArgs) => {
  if (request.method !== "POST") {
    throw new Response("Method not allowed", { status: 405 });
  }

  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);

  await toggleUpvote(client, {
    postId: Number(params.postId),
    userId,
  });

  return {
    ok: true,
  };
};
