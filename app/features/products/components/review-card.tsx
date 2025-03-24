import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { StarIcon } from "lucide-react";
import { DateTime } from "luxon";

interface ReviewCardProps {
  user: {
    name: string;
    username: string;
    avatarUrl: string | null;
    avatarFallback?: string;
  };
  rating: number;
  content: string;
  postedAt: string;
}

export function ReviewCard({
  user,
  rating,
  content,
  postedAt,
}: ReviewCardProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>
            {user.avatarFallback || user.name.charAt(0)}
          </AvatarFallback>
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
        </Avatar>
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-bold">{user.name}</h4>
          <span className="text-sm text-muted-foreground">
            @{user.username}
          </span>
        </div>
      </div>

      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon
            key={index}
            className={`size-4 ${
              index < rating
                ? "text-yellow-500 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <p>{content}</p>
      <span className="text-sm text-muted-foreground">
        {DateTime.fromISO(postedAt).toRelative()}
      </span>
    </div>
  );
}
