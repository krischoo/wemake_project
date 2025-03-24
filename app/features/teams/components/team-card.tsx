import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Badge } from "@/common/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/ui/avatar";

interface TeamCardProps {
  id: number;
  leaderUsername: string;
  leaderAvatarUrl: string | null;
  positions: string[];
  projectTitle: string;
}

export function TeamCard({
  id,
  leaderUsername,
  leaderAvatarUrl,
  positions,
  projectTitle,
}: TeamCardProps) {
  return (
    <Link to={`/teams/${id}`} className="block">
      <Card className="bg-transparent hover:bg-card/50 flex flex-col justify-between transition-colors h-full">
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="text-base leading-loose">
            <Badge
              variant="secondary"
              className="inline-flex shadow-sm items-center text-base gap-2"
            >
              <span>@{leaderUsername}</span>
              <Avatar className="size-8">
                {leaderAvatarUrl && (
                  <AvatarImage src={leaderAvatarUrl} />
                )}
                <AvatarFallback>
                  {leaderUsername.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Badge>{" "}
            <span className="text-base"> is looking for</span>
            {positions.map((position) => (
              <Badge
                key={position}
                variant="default"
                className="text-base"
              >
                {position}
              </Badge>
            ))}
            <span className="text-base">to build</span>
            <span className="text-base">{projectTitle}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="justify-end">
          <Button variant="link" className="text-base">
            Join Team &rarr;
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
