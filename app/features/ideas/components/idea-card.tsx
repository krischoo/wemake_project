import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/common/components/ui/card";
import { DotIcon, EyeIcon, HeartIcon, LockIcon } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { cn } from "@/lib/utils";
import { DateTime } from "luxon";
interface IdeaCardProps {
  key: number;
  id: number;
  title: string;
  viewCount?: number;
  likeCount?: number;
  postedAt?: string;
  claimed?: boolean;
  claimedAt?: string | null;
  owner?: boolean;
}

export function IdeaCard({
  key,
  id,
  title,
  viewCount,
  likeCount,
  postedAt,
  claimed,
  claimedAt,
  owner,
}: IdeaCardProps) {
  return (
    <Card className="bg-transparent hover:bg-card/50 transition-colors">
      <CardHeader>
        <Link to={claimed || owner ? "" : `/ideas/${id}`}>
          <CardTitle className="text-lg">
            <span
              className={cn(
                claimed
                  ? "break-all bg-muted-foreground text-muted-foreground"
                  : ""
              )}
            >
              {title}
            </span>
          </CardTitle>
        </Link>
      </CardHeader>
      {!claimed && !owner && (
        <CardContent className="flex gap-2 text-sm">
          <div className="flex items-center gap-2">
            <EyeIcon className="w-4 h-4" />
            <span>{viewCount}</span>

            <DotIcon className="w-4 h-4" />
            <span>
              {postedAt
                ? DateTime.fromISO(postedAt).toRelative()
                : ""}
            </span>
          </div>
        </CardContent>
      )}
      <CardFooter className="flex justify-end gap-2">
        {!claimed && !owner ? (
          <>
            <Button variant="outline" className="text-sm px-2">
              <HeartIcon className="w-4 h-4" />
              <span>{likeCount}</span>
            </Button>
            <Button
              variant="default"
              asChild
              className="text-sm px-5"
            >
              <Link
                className="tracking-tighter"
                to={`/ideas/${id}/claim`}
              >
                선점하기 &rarr;
              </Link>
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {claimedAt
                ? DateTime.fromISO(claimedAt).toRelative()
                : ""}
            </span>
            <Button
              variant="outline"
              className="text-sm px-2 cursor-not-allowed"
            >
              <LockIcon className="w-4 h-4" />
              <span>선점완료</span>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
