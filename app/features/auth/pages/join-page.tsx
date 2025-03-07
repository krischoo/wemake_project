import InputPair from "~/common/components/input-pair";
import { Route } from "./+types/join-page";
import { Form, Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";
export const meta: Route.MetaFunction = () => {
	return [
		{ title: "회원가입 | writenow" },
		{ name: "description", content: "회원가입 페이지입니다." },
	];
};

export default function JoinPage() {
	return (
		<div className="flex flex-col items-center justify-center h-full relative">
			<Button variant="ghost" asChild className="absolute top-5 right-5">
				<Link to="/auth/login">로그인</Link>
			</Button>
			<div className="flex flex-col items-center justify-center w-full max-w-md gap-10">
				<h1 className="text-2xl font-semibold">회원가입</h1>
				<Form method="post" className="w-full space-y-6">
					<InputPair
						id="name"
						label="이름"
						description="이름을 입력해주세요."
						name="name"
						type="text"
						placeholder="이름을 입력해주세요."
						required
					/>
					<InputPair
						id="username"
						label="닉네임"
						description="닉네임을 입력해주세요."
						name="username"
						type="text"
						placeholder="예: writenow123"
						required
					/>
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
					<InputPair
						id="password-confirm"
						label="비밀번호 확인"
						description="비밀번호를 입력해주세요."
						name="password-confirm"
						type="password"
						placeholder="비밀번호를 입력해주세요."
						required
					/>
					<Button type="submit" className="w-full">
						회원가입
					</Button>
				</Form>
				<AuthButtons />
			</div>
		</div>
	);
}
