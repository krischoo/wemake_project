import { redirect } from "react-router";
import { Route } from "./+types/my-profile-page";
import { makeSSRClient } from "~/supa-client";
import { getUserById } from "../queries-profiles";

export const loader = async ({ request }: Route.LoaderArgs) => {
  // 클라이언트 가져오기
  const { client } = await makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();

  if (user) {
    const profile = await getUserById(client, user.id);

    return redirect(`/users/${profile.username}`);
  }

  return redirect("/auth/login");
};
