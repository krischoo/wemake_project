import InputPair from "~/common/components/input-pair";
import { Route } from "./+types/join-page";
import { Form, Link, redirect, useNavigation } from "react-router";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";
import { makeSSRClient } from "~/supa-client";
import { z } from "zod";
import { checkUsernameExists } from "../queries-auth";
import { LoaderCircleIcon } from "lucide-react";
export const meta: Route.MetaFunction = () => {
  return [
    { title: "회원가입 | writenow" },
    { name: "description", content: "회원가입 페이지입니다." },
  ];
};

const formSchema = z.object({
  name: z.string().min(2, "이름을 입력해주세요."),
  username: z.string().min(1, "닉네임을 입력해주세요."),
  email: z.string().email("이메일 형식이 올바르지 않습니다."),
  password: z.string().min(8, "비밀번호를 입력해주세요."),
  passwordConfirm: z.string().min(8, "입력된 비밀번호와 다릅니다."),
});

// 객체 유효성 검사를 위한 refine 추가
const joinSchema = formSchema.refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: "입력된 비밀번호와 다릅니다.",
    path: ["passwordConfirm"],
  }
);

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = joinSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }

  // 닉네임 중복 검사
  const usernameExists = await checkUsernameExists(
    request,
    data.username // 검증을 거친 클린한 data
  );
  if (usernameExists) {
    // usernameExists가 true이면 가입 안됨
    return {
      formErrors: { username: ["이미 존재하는 닉네임입니다."] },
    };
  }

  //클라이언트 만들기
  const { client, headers } = makeSSRClient(request);
  const { error: signupError } = await client.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        username: data.username,
      },
    },
  });
  if (signupError) {
    return {
      signupError: signupError.message, // login 에러 처리와 같음
    };
  }
  return redirect("/", { headers });
};

export default function JoinPage({
  actionData,
}: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" ||
    navigation.state === "loading";
  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <Button
        variant="ghost"
        asChild
        className="absolute top-5 right-5"
      >
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
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">
              {actionData?.formErrors?.name?.join(", ")}
            </p>
          )}
          <InputPair
            id="username"
            label="닉네임"
            description="닉네임을 입력해주세요."
            name="username"
            type="text"
            placeholder="예: writenow123"
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">
              {actionData?.formErrors?.username?.join(", ")}
            </p>
          )}
          <InputPair
            id="email"
            label="이메일 주소"
            description="이메일 주소를 입력해주세요."
            name="email"
            type="email"
            placeholder="예: writenow@gmail.com"
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">
              {actionData?.formErrors?.email?.join(", ")}
            </p>
          )}
          <InputPair
            id="password"
            label="비밀번호"
            description="비밀번호를 입력해주세요."
            name="password"
            type="password"
            placeholder="영문 대,소문자+숫자+특수문자 10자 이상"
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">
              {actionData?.formErrors?.password?.join(", ")}
            </p>
          )}
          <InputPair
            id="password-confirm"
            label="비밀번호 확인"
            description="비밀번호를 입력해주세요."
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">
              {actionData?.formErrors?.passwordConfirm?.join(", ")}
            </p>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "회원가입"
            )}
          </Button>
          {actionData && "signupError" in actionData && (
            <p className="text-red-500">{actionData.signupError}</p>
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
