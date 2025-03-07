import { Link, Outlet } from "react-router";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";

export default function ProfileLayout() {
	return (
		<div className="space-y-10">
			<div>
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>N</AvatarFallback>
				</Avatar>
				<div>
					<h1 className="text-2xl font-bold">John Doe</h1>
					<Button variant="outline" size="sm">
						<Link to="/my/settings">프로필 수정</Link>
						{/* 만약 프로필을 보는 사람이 나 자신이라면 이 버튼을 보여주고, 다른 사람이라면 감춰짐 */}
					</Button>
				</div>
			</div>
			<Outlet />
		</div>
	);
}
