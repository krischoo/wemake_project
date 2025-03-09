import { MessageCircleIcon } from "lucide-react";
import { Route } from "./+types/messages-page";
export const meta: Route.MetaFunction = () => {
	return [
		{ title: "메시지" },
		{ name: "description", content: "메시지 페이지" },
	];
};

export default function MessagesPage() {
	return (
		<div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-4">
			<MessageCircleIcon className="size-12" />
			<h1 className="text-xl font-bold">좌측 메뉴에서 메시지를 선택하세요</h1>
		</div>
	);
}
