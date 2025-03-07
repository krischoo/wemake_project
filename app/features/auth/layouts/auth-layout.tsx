import { Outlet } from "react-router";

export default function AuthLayout() {
	return (
		<div className="grid grid-cols-2 h-screen">
			{/* 기본 레이아웃*/}
			<div className="bg-gradient-to-br from-purple-500 via-pink-500 to-primary/50"></div>

			{/* 페이지 내용 */}
			<Outlet />
		</div>
	);
}
