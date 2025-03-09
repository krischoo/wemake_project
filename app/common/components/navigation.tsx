import { Link } from "react-router";
import { Separator } from "~/common/components/ui/separator";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuContent,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "~/common/components/ui/navigation-menu";
import { Button } from "~/common/components/ui/button";

import { cn } from "~/lib/utils";

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuGroup,
} from "~/common/components/ui/dropdown-menu";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/common/components/ui/avatar";
import {
	UserPen,
	BarChart3Icon,
	UserIcon,
	SettingsIcon,
	LogOutIcon,
	BellIcon,
	MessageCircleIcon,
} from "lucide-react";
const menus = [
	{
		name: "Products",
		to: "/products",
		items: [
			{
				name: "Leaderboards",
				description: "See the top performers in your commnuity",
				to: "/products/leaderboards",
			},
			{
				name: "Categories",
				description: "See the top performers in your commnuity",
				to: "/products/categories",
			},
			{
				name: "Search",
				description: "Search for a product",
				to: "/products/search",
			},
			{
				name: "Submit a Product",
				description: "Submit a product to our community",
				to: "/products/submit",
			},
			{
				name: "Promote",
				description: "Promote your product to the community",
				to: "/products/promote",
			},
		],
	},
	{
		name: "Jobs",
		to: "/jobs",
		items: [
			{
				name: "Remote Jobs",
				description: "Find remote job in our community",
				to: "/jobs?location=remote",
			},
			{
				name: "Full-Time Jobs",
				description: "Find full-time job in our community",
				to: "/jobs?type=full-time",
			},
			{
				name: "Freelance Jobs",
				description: "Find freelance job in our community",
				to: "/jobs?type=freelance",
			},
			{
				name: "Part-Time Jobs",
				description: "Find part-time job in our community",
				to: "/jobs?type=part-time",
			},
			{
				name: "Internships",
				description: "Find internship in our community",
				to: "/jobs?type=internship",
			},
			{
				name: "Submit a Job",
				description: "Submit a job to our community",
				to: "/jobs/submit",
			},
		],
	},
	{
		name: "Community",
		to: "/community",
		items: [
			{
				name: "All Posts",
				description: "See all posts in our community",
				to: "/community",
			},
			{
				name: "Top Posts",
				description: "See the top posts in our community",
				to: "/community?sort=top",
			},
			{
				name: "New Posts",
				description: "See the new posts in our community",
				to: "/community?sort=new",
			},
			{
				name: "Create a Post",
				description: "Create a post to our community",
				to: "/community/create",
			},
		],
	},
	{
		name: "IdeasGPT",
		to: "/ideas",
	},
	{
		name: "Teams",
		to: "/teams",
		items: [
			{
				name: "All Teams",
				description: "See all teams in our community",
				to: "teams",
			},
			{
				name: "Create a Team",
				description: "Create a team to our community",
				to: "teams/submit",
			},
		],
	},
];

export default function Navigation({
	isLoggedIn,
	hasNotifications,
	hasMessages,
}: {
	isLoggedIn: boolean;
	hasNotifications: boolean;
	hasMessages: boolean;
}) {
	return (
		<nav className="flex px-20 h-16 items-center justify-between backdrop-blur-sm  fixed top-0 left-0 right-0 z-50 bg-background/50">
			<div className="flex items-center">
				<Link to="/" className="font-bold tracking-tighter text-lg">
					writenow
				</Link>
				<Separator orientation="vertical" className="h-6 mx-4 font-bold" />
				<NavigationMenu>
					<NavigationMenuList>
						{menus.map((menu) => (
							<NavigationMenuItem key={menu.name}>
								{menu.items ? (
									<>
										<Link to={menu.to}>
											<NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
										</Link>
										<NavigationMenuContent>
											<ul className="grid w-[600px] font-light gap-3 p-4 grid-cols-2">
												{menu.items?.map((item) => (
													<NavigationMenuItem
														key={item.name}
														className={cn(
															"select-none rounded-md transition-colors hover:bg-accent focus:bg-accent",
															item.to === "/products/promote" &&
																"col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
															item.to === "/jobs/submit" &&
																"col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20"
														)}
													>
														<NavigationMenuLink asChild>
															<Link
																className="p-3 space-y-1 block leading-none no-underline outline-none"
																to={item.to}
															>
																<span className="text-m font-medium leading-none ">
																	{item.name}
																</span>
																<p className="text-sm text-muted-foreground leading-snug">
																	{item.description}
																</p>
															</Link>
														</NavigationMenuLink>
													</NavigationMenuItem>
												))}
											</ul>
										</NavigationMenuContent>
									</>
								) : (
									<Link className={navigationMenuTriggerStyle()} to={menu.to}>
										{menu.name}
									</Link>
								)}
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
			{isLoggedIn ? (
				<div className="flex items-center gap-2">
					<Button size="default" variant="ghost" asChild className="relative">
						<Link to="/my/notifications">
							<BellIcon className="w-4 h-4" />
							{hasNotifications && (
								<span className="absolute top-1 right-0 w-2 h-2 bg-red-500 rounded-full" />
							)}
						</Link>
					</Button>
					<Button size="icon" variant="ghost" asChild className="relative">
						<Link to="/my/messages">
							<MessageCircleIcon className="w-4 h-4" />
							{hasMessages && (
								<span className="absolute top-1 right-0 w-2 h-2 bg-red-500 rounded-full" />
							)}
						</Link>
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Avatar>
								<AvatarImage src="https://github.com/krischoo.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuLabel className="flex flex-col">
								<span className="font-bold">크리스추</span>
								<span className="text-s text-muted-foreground">@krischoo</span>
							</DropdownMenuLabel>

							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<Link to="/my/dashboard" className="flex items-center ">
										<BarChart3Icon className="w-4 h-4 mr-2" />
										Dashboard
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link to="/my/profile" className="flex items-center ">
										<UserIcon className="w-4 h-4 mr-2" />
										Profile
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link to="/my/settings" className="flex items-center ">
										<SettingsIcon className="w-4 h-4 mr-2" />
										Settings
									</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link to="/auth/logout" className="flex items-center ">
									<LogOutIcon className="w-4 h-4 mr-2" />
									Logout
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			) : (
				<div className="flex items-center gap-4">
					<Button asChild variant="secondary">
						<Link to="/auth/login">로그인</Link>
					</Button>
					<Button asChild>
						<Link to="/auth/signup">가입하기</Link>
					</Button>
				</div>
			)}
		</nav>
	);
}
