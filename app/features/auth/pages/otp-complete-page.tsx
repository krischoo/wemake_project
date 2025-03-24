import InputPair from "~/common/components/input-pair";
import { Route } from "./+types/otp-complete-page";
import {
  Form,
  Link,
  redirect,
  useNavigation,
  useSearchParams,
} from "react-router";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { z } from "zod";
import { LoaderCircleIcon } from "lucide-react";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "OTP 인증 | writenow" },
    { name: "description", content: "OTP 인증 페이지입니다." },
  ];
};

const formSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    return {
      fieldErrors: error.flatten().fieldErrors,
    };
  }
  const { email, otp } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: verifyError } = await client.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });
  if (verifyError) {
    if (
      verifyError.message.includes("Token has expired or is invalid")
    ) {
      return {
        verifyError:
          "OTP 코드가 올바르지 않거나, 시간이 초과되었습니다.",
      };
    }
    return { verifyError: verifyError.message };
  }
  return redirect("/", { headers });
};

export default function OtpCompletePage({
  actionData,
}: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
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
          <h1 className="text-2xl font-semibold">OTP 인증</h1>
          <p>이메일로 전송된 6자리 숫자 코드를 입력해주세요.</p>
        </div>
        <Form method="post" className="w-full space-y-6">
          <InputPair
            id="email"
            defaultValue={email || ""}
            label="이메일 주소"
            description="이메일 주소를 입력해주세요."
            name="email"
            type="email"
            placeholder="예: writenow@gmail.com"
            required
          />
          {actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">
              {actionData.fieldErrors?.email?.join(", ")}
            </div>
          )}
          <InputPair
            id="otp"
            label="OTP 코드"
            description="OTP 코드를 입력해주세요."
            name="otp"
            type="text"
            placeholder="예: 123456"
            required
          />
          {actionData && "verifyError" in actionData && (
            <div className="text-red-500">
              {actionData.verifyError}
            </div>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "OTP 코드인증"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}
