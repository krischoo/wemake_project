import InputPair from "~/common/components/input-pair";
import { Route } from "./+types/otp-start-page";
import { Form, Link } from "react-router";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "OTP 로그인 | writenow" },
		{ name: "description", content: "OTP 로그인 페이지입니다." },
	];
};
export default function OtpStartPage() {
	return (
		<div className="flex flex-col items-center justify-center h-full relative">
			<Button variant="ghost" asChild className="absolute top-5 right-5">
				<Link to="/auth/join">회원가입</Link>
			</Button>
			<div className="flex flex-col items-center justify-center w-full max-w-md gap-10">
				<div
					className="flex flex-col items-center justify-center gap-4
				"
				>
					<h1 className="text-2xl font-semibold">OTP 로그인</h1>
					<p>계정에 로그인하기 위한 4자리 숫자 코드를 보내겠습니다.</p>
				</div>
				<Form method="post" className="w-full space-y-6">
					<InputPair
						id="email"
						label="이메일 주소"
						description="이메일 주소를 입력해주세요."
						name="email"
						type="email"
						placeholder="예: writenow@gmail.com"
						required
					/>

					<Button type="submit" className="w-full">
						OTP 코드 보내기
					</Button>
				</Form>
			</div>
		</div>
	);
}
