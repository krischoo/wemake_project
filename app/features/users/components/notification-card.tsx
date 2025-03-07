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

interface NotificationCardProps {
	username: string;
	message: string;
	timestamp: string;
	avatarUrl?: string;
	seen: boolean;
}

export default function NotificationCard({
	username,
	message,
	timestamp,
	avatarUrl,
	seen,
}: NotificationCardProps) {
	return (
		<Card className={cn("min-w-[450px]", !seen && "bg-yellow-500/60")}>
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
						<span> {message}</span>
					</CardTitle>
					<small className="text-muted-foreground">{timestamp}</small>
				</div>
			</CardHeader>
			<CardFooter className="flex justify-end">
				<Button variant="outline" size="icon">
					<EyeIcon />
				</Button>
			</CardFooter>
		</Card>
	);
}
