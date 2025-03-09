import { Link, useLocation } from "react-router";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/common/components/ui/avatar";
import {
	SidebarMenuItem,
	SidebarMenuButton,
} from "~/common/components/ui/sidebar";
import { cn } from "~/lib/utils";

interface MessageCardProps {
	avatarUrl?: string;
	id: string;
	name: string;
	lastMessage: string;
}

export function MessageRoomCard({
	avatarUrl,
	id,
	name,
	lastMessage,
}: MessageCardProps) {
	const location = useLocation();
	const isActive = location.pathname === `/my/messages/${id}`;
	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				className={cn("h-18", isActive && "bg-primary/10")}
				asChild
			>
				<Link to={`my/messages/${id}`}>
					<div className="flex items-center gap-2 ">
						<Avatar>
							<AvatarImage src={avatarUrl} />
							<AvatarFallback>{name[0]}</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<span className="text-sm font-medium">{name}</span>
							<span className="text-xs text-muted-foreground">
								{lastMessage}
							</span>
						</div>
					</div>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}
