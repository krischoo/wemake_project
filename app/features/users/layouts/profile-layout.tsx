import { Form, Link, NavLink, Outlet } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import {
  Button,
  buttonVariants,
} from "~/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/common/components/ui/dialog";
import { Textarea } from "~/common/components/ui/textarea";
import CreateReviewDialog from "~/features/products/components/create-review-dialog";
import { cn } from "~/lib/utils";
import { Route } from "./+types/profile-layout";
import { getUserProfile, getUserProducts } from "../queries-profiles";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({
  params,
  request,
}: Route.LoaderArgs) => {
  const { client } = await makeSSRClient(request);
  const { username } = params;
  if (!username) {
    throw new Response("Not Found", { status: 404 });
  }
  const user = await getUserProfile(client, username);

  return { user };
};

export default function ProfileLayout({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <header className="flex items-center gap-4">
        <Avatar className="size-28">
          {loaderData.user.avatar ? (
            <AvatarImage src={loaderData.user.avatar} />
          ) : (
            <AvatarFallback>{loaderData.user.name[0]}</AvatarFallback>
          )}
        </Avatar>
        <div className="space-y-2">
          <div className="flex gap-2">
            <h1 className="text-2xl font-bold">
              {loaderData.user.name}
            </h1>
            {/* 만약 프로필을 보는 사람이 나 자신이라면 이 버튼을 보여주고, 다른 사람이라면 감춰짐 */}
            <Button variant="outline" size="sm">
              <Link to="/my/settings">프로필 수정</Link>
            </Button>
            <Button variant="secondary" size="sm">
              팔로우 하기
            </Button>
            {/* 유저에게 메시지를 보낼 수 있는 버튼 */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm">
                  메시지 보내기
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>메시지 보내기</DialogTitle>
                </DialogHeader>
                <DialogDescription className="space-y-4">
                  <span>John Doe에게 메시지를 보내세요.</span>
                  <Form className="space-y-4">
                    <Textarea
                      placeholder="메시지를 입력하세요."
                      className="resize-none row-4"
                    />
                    <Button type="submit">보내기</Button>
                  </Form>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground">
              @{loaderData.user.username}
            </span>
            <Badge variant="secondary">{loaderData.user.role}</Badge>
            <Badge variant="secondary">팔로잉 100</Badge>
            <Badge variant="secondary">팔로워 100</Badge>
          </div>
        </div>
      </header>
      <div className="flex gap-5">
        {[
          {
            label: "About",
            to: `/users/${loaderData.user.username}`,
          },
          {
            label: "Products",
            to: `/users/${loaderData.user.username}/products`,
          },
          {
            label: "Posts",
            to: `/users/${loaderData.user.username}/posts`,
          },
        ].map((item) => (
          <NavLink
            end
            key={item.label}
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "outline" }),
                isActive && "bg-primary"
              )
            }
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="max-w-screen-md">
        <Outlet
          context={{
            headline: loaderData.user.headline,
            bio: loaderData.user.bio,
          }}
        />
      </div>
    </div>
  );
}
