import InputPair from "~/common/components/input-pair";
import { Route } from "./+types/otp-complete-page";
import { Form, Link } from "react-router";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "OTP 인증 | writenow" },
		{ name: "description", content: "OTP 인증 페이지입니다." },
	];
};
export default function OtpCompletePage() {
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
					<h1 className="text-2xl font-semibold">OTP 인증</h1>
					<p>이메일로 전송된 4자리 숫자 코드를 입력해주세요.</p>
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
					<InputPair
						id="otp"
						label="OTP 코드"
						description="OTP 코드를 입력해주세요."
						name="otp"
						type="text"
						placeholder="예: 1234"
						required
					/>

					<Button type="submit" className="w-full">
						로그인
					</Button>
				</Form>
			</div>
		</div>
	);
}
