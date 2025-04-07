import { Link, useFetcher } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/common/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/ui/avatar";
import { Button } from "@/common/components/ui/button";
import { DotIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";
interface PostCardProps {
  id: number;
  title: string;
  author: string;
  authorAvatarUrl: string | null;
  category: string;
  createdAt: string;
  expanded?: boolean;
  upvoteCount?: number;
  isUpvoted?: boolean;
}

export function PostCard({
  id,
  title,
  author,
  authorAvatarUrl,
  category,
  createdAt,
  expanded = false,
  upvoteCount = 0,
  isUpvoted = false,
}: PostCardProps) {
  const fetcher = useFetcher();
  const optimisticVoteCount =
    fetcher.state === "idle"
      ? upvoteCount
      : isUpvoted
      ? upvoteCount - 1
      : upvoteCount + 1;
  const optimisticIsUpvoted =
    fetcher.state === "idle" ? isUpvoted : !isUpvoted;
  const absoluteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetcher.submit(null, {
      method: "POST",
      action: `/community/${id}/upvote`,
    });
  };
  return (
    <Link to={`/community/${id}`} className="block">
      <Card
        className={cn(
          "bg-transparent hover:bg-card/50 transition-colors",
          expanded ? "flex flex-row items-center justify-between" : ""
        )}
      >
        <CardHeader className="flex flex-row items-center gap-2">
          <Avatar className="size-14 w-10 h-10">
            <AvatarImage src={authorAvatarUrl ?? ""} />
            <AvatarFallback>
              {author.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <CardTitle>{title}</CardTitle>
            <div className="flex flex-wrap gap-2 text-muted-foreground leading-tight text-s">
              <span>{author}</span>
              <span>{category}</span>
              <span>
                <DotIcon className="w-4 h-4" />
              </span>
              <span>{DateTime.fromISO(createdAt).toRelative()}</span>
            </div>
          </div>
        </CardHeader>
        {!expanded && (
          <CardFooter className="flex justify-end">
            <Button variant="link">Reply &rarr;</Button>
          </CardFooter>
        )}
        {expanded && (
          <CardFooter className="flex justify-end py-0">
            <Button
              onClick={absoluteClick}
              variant="outline"
              className={cn(
                "flex flex-col h-14",
                optimisticIsUpvoted &&
                  "border-primary border-2 font-bold text-primary"
              )}
            >
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>{optimisticVoteCount}</span>
            </Button>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
