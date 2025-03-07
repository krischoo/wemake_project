import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { DotIcon, MessageCircleIcon } from "lucide-react";
import { Form, Link } from "react-router";
import { useState } from "react";
import { Textarea } from "~/common/components/ui/textarea";

interface ReplyProps {
	username: string;
	avatarUrl?: string;
	content: string;
	postedAt: string;
	topLevel: boolean;
}

export default function Reply({
	username,
	avatarUrl,
	content,
	postedAt,
	topLevel,
}: ReplyProps) {
	const [replying, setReplying] = useState(false);
	const toggleReplying = () => setReplying((prev) => !prev);
	return (
		<div className="flex flex-col gap-4">
			{/* 댓글 컨텐츠 목록*/}

			<div className="flex gap-4 items-start">
				<Avatar className="size-16">
					<AvatarFallback>{username[0]}</AvatarFallback>
					{avatarUrl && <AvatarImage src={avatarUrl} />}
				</Avatar>
				<div className="space-y-2 flex flex-col w-full">
					<div className="flex gap-2 items-center">
						<Link to={`/users/@${username}`}>
							<h4 className="text-lg font-medium">{username}</h4>
						</Link>
						<DotIcon className="size-4" />
						<span className="text-sm text-muted-foreground">{postedAt}</span>
					</div>
					{/* 댓글 내용 */}
					<div>
						<p>{content}</p>
					</div>
					<Button
						size="sm"
						variant="secondary"
						className="flex items-center gap-2 self-end"
						onClick={toggleReplying}
					>
						<MessageCircleIcon />
						답글 달기
					</Button>
				</div>
			</div>

			{replying && (
				<section className="flex gap-2 w-full">
					<Avatar className="size-12">
						<AvatarFallback>N</AvatarFallback>
						<AvatarImage src="https://github.com/krischoo.png" />
					</Avatar>

					<Form className="flex flex-col gap-2 w-full items-end">
						<Textarea
							placeholder="댓글을 입력하세요"
							className="resize-none w-full"
							rows={10}
						/>
						<Button type="submit">댓글 작성하기</Button>
					</Form>
				</section>
			)}
			{/* 답글의 대댓글 목록 */}
			{topLevel && (
				<div className="pl-20 w-full ">
					<Reply
						username="강석훈"
						avatarUrl="https://github.com/devlee.png"
						content="저는 Notion과 GitHub Projects를 연동해서 사용하고 있어요. 특히 API 개발 작업에서는 Postman으로 API 문서화도 함께하면 효율적입니다."
						postedAt="8시간 전"
						topLevel={false}
					/>
				</div>
			)}
		</div>
	);
}
