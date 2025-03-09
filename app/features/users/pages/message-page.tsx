import { SendIcon } from "lucide-react";
import { Form } from "react-router";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/common/components/ui/avatar";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/common/components/ui/card";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { MessageBubble } from "../components/message-bubble";

export default function MessagePage() {
	return (
		<div className="h-full flex flex-col justify-between">
			{/* 사용자 프로필 */}
			<Card>
				<CardHeader className="flex flex-row items-center gap-4">
					<Avatar className="size-14">
						<AvatarImage src="http://github.com/steve.png"></AvatarImage>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div className="flex flex-col gap-0">
						<CardTitle>스티브 잡스</CardTitle>
						<CardDescription>2일 전</CardDescription>
					</div>
				</CardHeader>
			</Card>

			{/* 메시지 내용 섹션 */}
			<section className="flex-1 overflow-y-auto space-y-10 py-4">
				{Array.from({ length: 10 }).map((_, index) => (
					<MessageBubble
						key={index}
						avatarUrl="http://github.com/steve.png"
						avatarFallback="SJ"
						message="안녕하세요! 메시지를 보내주셔서 감사합니다. 안녕하세요! 메시지를 보내주셔서 감사합니다. 안녕하세요! 메시지를 보내주셔서 감사합니다."
						isCurrentUser={index % 2 === 0}
					/>
				))}
			</section>

			{/* 메시지 보내는 폼 */}
			<Card>
				<CardHeader>
					<Form className="relative flex flex-col justify-center items-end ">
						<Textarea
							placeholder="메시지를 입력하세요"
							className="resize-none"
							rows={2}
						/>
						<Button type="submit" size="icon" className="absolute right-3">
							<SendIcon className="size-4" />
						</Button>
					</Form>
				</CardHeader>
			</Card>
		</div>
	);
}
