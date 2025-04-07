import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "../queries-profiles";

import { seeNotification } from "../mutations-profiles";
import { Route } from "./+types/see-notification-page";
export const action = async ({
  request,
  params,
}: Route.ActionArgs) => {
  if (request.method !== "POST") {
    throw new Response("Method not allowed", { status: 405 });
  }

  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const { notificationId } = params;

  await seeNotification(client, {
    notificationId,
    userId,
  });

  return {
    ok: true,
  };
};
