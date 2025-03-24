import InputPair from "~/common/components/input-pair";
import { Route } from "./+types/otp-start-page";
import { Form, Link, redirect, useNavigation } from "react-router";
import { Button } from "~/common/components/ui/button";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { LoaderCircleIcon } from "lucide-react";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "OTP 로그인 | writenow" },
    { name: "description", content: "OTP 로그인 페이지입니다." },
  ];
};

const formSchema = z.object({
  email: z.string().email(),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data } = formSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    return { error: "이메일 형식에 맞지 않습니다." };
  }
  const { email } = data;
  const { client } = makeSSRClient(request);
  const { error } = await client.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });
  if (error) {
    if (error.message.includes("Signups not allowed for otp")) {
      return {
        error:
          "가입되지 않은 이메일입니다. 회원가입을 먼저 진행해주세요.",
      };
    }
    return { error: error.message };
  }
  return redirect(`/auth/otp/complete?email=${email}`);
};

export default function OtpStartPage({
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
        <div
          className="flex flex-col items-center justify-center gap-4
				"
        >
          <h1 className="text-2xl font-semibold">OTP 로그인</h1>
          <p>
            계정에 로그인하기 위한 6자리 숫자 코드를 보내겠습니다.
          </p>
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
          {actionData && "error" in actionData && (
            <p className="text-red-500">{actionData.error}</p>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "OTP 코드 보내기"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}
