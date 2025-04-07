import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { EyeIcon, UserIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { notificationType } from "../schema-profiles";
import { Link, Form, useFetcher } from "react-router";

interface NotificationCardProps {
  id: number;
  username: string;
  type: "follow" | "review" | "reply";
  timestamp: string;
  avatarUrl?: string;
  seen: boolean;
  productName?: string;
  postTitle?: string;
  payloadId?: number;
  notificationId: number;
}

export default function NotificationCard({
  id,
  username,
  type,
  timestamp,
  avatarUrl,
  seen,
  productName,
  postTitle,
  payloadId,
  notificationId,
}: NotificationCardProps) {
  const getMessage = (type: "review" | "follow" | "reply") => {
    switch (type) {
      case "follow":
        return "님이 팔로우했습니다.";
      case "review":
        return `님이 리뷰를 작성했습니다.`;
      case "reply":
        return `님이 댓글을 작성했습니다.`;
    }
  };
  const fetcher = useFetcher();
  const optimisticSeen = fetcher.state === "idle" ? seen : true;
  return (
    <Card
      className={cn("min-w-[450px]", !seen && "bg-yellow-500/60")}
    >
      <CardHeader className="flex flex-row items-center gap-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>
            <UserIcon className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">
            <span>@{username}</span>
            <span> {getMessage(type)}</span>
            <br />
            {productName && (
              <Button variant="ghost" asChild>
                <Link to={`/products/${payloadId}`}>
                  {productName}
                </Link>
              </Button>
            )}
            {postTitle && (
              <Button variant="link" asChild>
                <Link to={`/community/${payloadId}`}>
                  {postTitle}
                </Link>
              </Button>
            )}
          </CardTitle>
          <small className="text-muted-foreground">{timestamp}</small>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end">
        {optimisticSeen ? null : (
          <fetcher.Form
            method="post"
            action={`/my/notifications/${id}/see`}
          >
            <Button variant="outline" size="icon" type="submit">
              <EyeIcon />
            </Button>
          </fetcher.Form>
        )}
      </CardFooter>
    </Card>
  );
}
