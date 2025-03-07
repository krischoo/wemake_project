import InputPair from "~/common/components/input-pair";
import { Route } from "./+types/login-page";
import { Form, Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";
export const meta: Route.MetaFunction = () => {
	return [
		{ title: "로그인 | writenow" },
		{ name: "description", content: "로그인 페이지입니다." },
	];
};

export default function LoginPage() {
	return (
		<div className="flex flex-col items-center justify-center h-full relative">
			<Button variant="ghost" asChild className="absolute top-5 right-5">
				<Link to="/auth/join">회원가입</Link>
			</Button>
			<div className="flex flex-col items-center justify-center w-full max-w-md gap-10">
				<h1 className="text-2xl font-semibold">로그인</h1>
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
						id="password"
						label="비밀번호"
						description="비밀번호를 입력해주세요."
						name="password"
						type="password"
						placeholder="영문 대,소문자+숫자+특수문자 10자 이상"
						required
					/>

					<Button type="submit" className="w-full">
						로그인
					</Button>
				</Form>
				<AuthButtons />
			</div>
		</div>
	);
}
