import { Link } from "react-router";
import {
	Card,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/common/components/ui/card";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/common/components/ui/avatar";
import { Button } from "@/common/components/ui/button";
import { DotIcon } from "lucide-react";
interface PostCardProps {
	id: string;
	title: string;
	author: string;
	authorAvatarUrl: string;
	category: string;
	createdAt: string;
}

export function PostCard({
	id,
	title,
	author,
	authorAvatarUrl,
	category,
	createdAt,
}: PostCardProps) {
	return (
		<Link to={`/community/${id}`}>
			<Card className="bg-transparent hover:bg-card/50 transition-colors">
				<CardHeader className="flex flex-row items-center gap-2">
					<Avatar className="size-14 w-10 h-10">
						<AvatarImage src={authorAvatarUrl} />
						<AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback>
					</Avatar>
					<div className="space-y-2">
						<CardTitle>{title}</CardTitle>
						<div className="flex flex-wrap gap-2 text-muted-foreground leading-tight text-s">
							<span>{author}</span>
							<span>{category}</span>
							<span>
								<DotIcon className="w-4 h-4" />
							</span>
							<span>{createdAt}</span>
						</div>
					</div>
				</CardHeader>
				<CardFooter className="flex justify-end">
					<Button variant="link"></Button>
				</CardFooter>
			</Card>
		</Link>
	);
}
