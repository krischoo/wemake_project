import { Outlet } from "react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarMenu,
	SidebarProvider,
	SidebarGroup,
} from "~/common/components/ui/sidebar";
import { MessageRoomCard } from "../components/message-card";

export default function MessagesLayout() {
	return (
		<SidebarProvider className="max-h-[calc(100vh-12rem)] h-[calc(100vh-12rem)] overflow-hidden  min-h-full">
			<Sidebar variant="floating" className="pt-16">
				<SidebarContent>
					<SidebarGroup>
						<SidebarMenu>
							{Array.from({ length: 10 }).map((_, index) => (
								<MessageRoomCard
									key={index}
									id={`${index}.toString()`}
									avatarUrl="https://github.com/shadcn.png"
									name={`User ${index}`}
									lastMessage={`Last message ${index}`}
								/>
							))}
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
			<div className="h-full w-full">
				<Outlet />
			</div>
		</SidebarProvider>
	);
}
