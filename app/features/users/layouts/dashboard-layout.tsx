import { Link, Outlet } from "react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarMenu,
	SidebarProvider,
	SidebarGroup,
	SidebarMenuButton,
	SidebarGroupLabel,
	SidebarMenuItem,
} from "~/common/components/ui/sidebar";
import { HomeIcon, PackageIcon, RocketIcon, SparkleIcon } from "lucide-react";
import { useLocation } from "react-router";
export default function DashboardLayout() {
	const location = useLocation();
	return (
		<SidebarProvider className="max-h-[calc(100vh-12rem)] h-[calc(100vh-12rem)] overflow-hidden  min-h-full">
			<Sidebar variant="floating" className="pt-16">
				<SidebarContent>
					<SidebarGroup>
						<SidebarMenu>
							{/* Home */}
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									isActive={location.pathname === "/my/dashboard"}
								>
									<Link to="/my/dashboard">
										<HomeIcon className="w-4 h-4 mr-2" />
										<span>Home</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							{/* Ideas */}
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									isActive={location.pathname === "/my/dashboard/ideas"}
								>
									<Link to="/my/dashboard/ideas">
										<SparkleIcon className="w-4 h-4 mr-2" />
										<span>Ideas</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroup>

					{/* 모든 제품에 대한 통계 */}
					<SidebarGroup>
						<SidebarGroupLabel>
							<span>제품 분석 통계</span>
						</SidebarGroupLabel>

						{/* 제품- 1 */}
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link to="/my/dashboard/products/1">
										<RocketIcon className="w-4 h-4 mr-2" />
										<span>제품- 1</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
			<div className="h-full w-full overflow-y-auto">
				<Outlet />
			</div>
		</SidebarProvider>
	);
}
