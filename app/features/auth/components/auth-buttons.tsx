import { Separator } from "~/common/components/ui/separator";
import { Button } from "~/common/components/ui/button";
import SocialIcon from "~/common/components/icon/social-icon";
import { Link } from "react-router";
import { LockKeyholeIcon } from "lucide-react";
export default function AuthButtons() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      {/* 구분선 */}
      <div className="w-full flex flex-col items-center justify-center gap-2 mb-5">
        <Separator className="w-1/2" />
        <span className="text-xs text-muted-foreground font-sans">
          다른 방법으로 로그인하기
        </span>
        <Separator className="w-1/2" />
      </div>

      {/* OTP 로그인 */}
      <Button
        variant="outline"
        className="w-full mb-5"
        size="lg"
        asChild
      >
        <Link to="/auth/otp/start">
          <LockKeyholeIcon className="mr-2 !size-[18px]" />
          OTP
        </Link>
      </Button>

      {/* 소셜 로그인 */}
      <div className="w-full flex flex-col gap-3">
        <Button
          variant="outline"
          className="w-full"
          size="lg"
          asChild
        >
          <Link to="/auth/social/kakao/start">
            <SocialIcon name="kakao" className="mr-2 !size-[24px]" />
            KakaoTalk
          </Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/social/google/start">
            <SocialIcon name="google" className="mr-2" />
            Google
          </Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/social/apple/start">
            <SocialIcon name="apple" className="mr-2 !size-[22px]" />
            Apple
          </Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/social/github/start">
            <SocialIcon name="github" className="mr-2 !size-[20px]" />
            Github
          </Link>
        </Button>
      </div>
    </div>
  );
}
