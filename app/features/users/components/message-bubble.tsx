import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/common/components/ui/avatar";
import { cn } from "~/lib/utils";

interface MessageBubbleProps {
	avatarUrl?: string;
	avatarFallback: string;
	message: string;
	isCurrentUser?: boolean;
}

export function MessageBubble({
	avatarUrl,
	avatarFallback,
	message,
	isCurrentUser = false,
}: MessageBubbleProps) {
	return (
		<div
			className={cn(
				"flex items-start gap-4",
				isCurrentUser && "flex-row-reverse"
			)}
		>
			<Avatar className="h-8 w-8">
				<AvatarImage src={avatarUrl} />
				<AvatarFallback>{avatarFallback}</AvatarFallback>
			</Avatar>
			<div
				className={cn(
					"rounded-md p-3 max-w-[50%]",
					isCurrentUser
						? "bg-primary text-primary-foreground rounded-tr-none"
						: "bg-muted text-foreground rounded-tl-none"
				)}
			>
				<p>{message}</p>
			</div>
		</div>
	);
}
