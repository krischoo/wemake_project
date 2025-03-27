import InputPair from "~/common/components/input-pair";
import { Route } from "./+types/login-page";
import { Form, Link, redirect, useNavigation } from "react-router";

import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";
import { CircleIcon, LoaderCircleIcon } from "lucide-react";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
export const meta: Route.MetaFunction = () => {
  return [
    { title: "로그인 | writenow" },
    {
      name: "description",
      content: "로그인 페이지입니다.",
    },
  ];
};

const formSchema = z.object({
  email: z
    .string({
      required_error: "이메일을 입력해주세요.",
      invalid_type_error: "이메일 형식이 올바르지 않습니다.",
    })
    .email("이메일 형식이 이게 뭡니까?"),
  password: z
    .string({
      required_error: "비밀번호를 입력해주세요.",
      invalid_type_error: "비밀번호 형식이 올바르지 않습니다.",
    })
    .min(8, "8자 이상...픈니즈"),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();

  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return {
      loginError: null,
      formError: error.flatten().fieldErrors,
    };
  }
  // 성공하지 못하면 일단 모든 에러들을 반환해봐
  // 하나씩 뜯어보자
  const { email, password } = data; // 입력한 이메일, 비번 가져와
  const { client, headers } = makeSSRClient(request); // 클라이언트 생성
  const { error: loginError } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    return {
      formError: null,
      loginError: loginError.message,
    };
  }

  return redirect("/", { headers });
};

export default function LoginPage({
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
          {actionData && "formError" in actionData && (
            <p className="text-red-500">
              {actionData?.formError?.email?.join(", ")}
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
          {actionData && "formError" in actionData && (
            <p className="text-red-500">
              {actionData?.formError?.password?.join(", ")}
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
              "로그인"
            )}
          </Button>

          {actionData &&
            "loginError" in actionData && ( // 로그인 에러 표시 : 이메일 혹은 비밀번호 틀림 등
              <p className="text-blue-500">{actionData.loginError}</p>
            )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
