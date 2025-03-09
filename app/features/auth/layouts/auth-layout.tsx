import { Outlet } from "react-router";
import { FlickeringGrid } from "~/common/components/ui/flickering-grid";
export default function AuthLayout() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
			{/* MagicUI 활용 레이아웃*/}
			<div>
				<FlickeringGrid
					squareSize={40}
					gridGap={10}
					flickerChance={0.1}
					color="#E21D47"
					maxOpacity={0.5}
				/>
			</div>

			{/* 페이지 내용 */}
			<Outlet />
		</div>
	);
}
