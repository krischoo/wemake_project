import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";
import { Route } from "./+types/logout-page";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  await client.auth.signOut();

  return redirect("/", { headers });
};
