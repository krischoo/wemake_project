import NotificationCard from "../components/notification-card";
import { Route } from "./+types/notifications-page";

export const meta: Route.MetaFunction = () => {
	return [
		{
			title: "알림 | writenow",
		},
	];
};

export default function NotificationsPage() {
	return (
		<div className="space-y-10">
			<h1 className="text-2xl font-bold">알림</h1>
			<div className="flex flex-col items-start gap-5">
				<NotificationCard
					username="stevejobs"
					message="님이 좋아요를 눌렀습니다."
					timestamp="이틀 전"
					avatarUrl="https://github.com/shadcn.png"
					seen={false}
				/>
			</div>
		</div>
	);
}
