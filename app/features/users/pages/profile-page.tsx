import { useOutletContext } from "react-router";
import { Route } from "./+types/profile-page";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "프로필" },
    { name: "description", content: "프로필 페이지" },
  ];
};

export const loader = async ({
  params,
  request,
}: Route.LoaderArgs) => {
  const { client } = await makeSSRClient(request);
  await client.rpc("track_event", {
    event_type: "profile_view",
    event_data: {
      username: params.username,
    },
  });
  return null;
};

export default function ProfilePage() {
  const { headline, bio } = useOutletContext<{
    headline: string;
    bio: string;
  }>();
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-bold">헤드라인(headline)</h4>
      <p className="text-sm text-muted-foreground">{headline}</p>

      <h4 className="text-lg font-bold">소개글(bio)</h4>
      <p className="text-sm text-muted-foreground">{bio}</p>
    </div>
  );
}
