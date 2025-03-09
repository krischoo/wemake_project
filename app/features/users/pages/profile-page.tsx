import { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "프로필" },
		{ name: "description", content: "프로필 페이지" },
	];
};

export default function ProfilePage() {
	return (
		<div className="space-y-4">
			<h4 className="text-lg font-bold">헤드라인</h4>
			<p className="text-sm text-muted-foreground">
				저는 프론트엔드 개발자입니다. 리액트와 타입스크립트를 주로 사용하며,
				사용자 경험을 개선하는 것에 큰 관심이 있습니다. 현재는 오픈소스
				프로젝트에 기여하면서 개발 커뮤니티와 적극적으로 소통하고 있습니다.
				새로운 기술을 배우고 적용하는 것을 좋아하며, 특히 웹 접근성과 성능
				최적화에 대해 깊이 있게 연구하고 있습니다.
			</p>

			<h4 className="text-lg font-bold">소개글</h4>
			<p className="text-sm text-muted-foreground">
				저는 프론트엔드 개발자입니다. 리액트와 타입스크립트를 주로 사용하며,
				사용자 경험을 개선하는 것에 큰 관심이 있습니다. 현재는 오픈소스
				프로젝트에 기여하면서 개발 커뮤니티와 적극적으로 소통하고 있습니다.
				새로운 기술을 배우고 적용하는 것을 좋아하며, 특히 웹 접근성과 성능
				최적화에 대해 깊이 있게 연구하고 있습니다.
			</p>
		</div>
	);
}
