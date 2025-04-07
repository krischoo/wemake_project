import Hero from "~/common/components/hero";
import { Route } from "./+types/settings-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Button } from "~/common/components/ui/button";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import {
  checkUsernameAvailability,
  getLoggedInUserId,
  getUserById,
} from "../queries-profiles";
import { makeSSRClient } from "~/supa-client";
import { Z } from "node_modules/react-router/dist/development/route-data-BL8ToWby.mjs";
import { z } from "zod";
import { updateUser, updateUserAvatar } from "../mutations-profiles";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/common/components/ui/alert";
export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "설정 | writenow",
    },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const user = await getUserById(client, userId);

  return { user };
};

const formSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  headline: z.string().optional().default(""),
  bio: z.string().optional().default(""),
  username: z.string().min(1),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();

  const avatar = formData.get("avatar");

  if (avatar && avatar instanceof File) {
    if (avatar.size <= 2097152 && avatar.type.startsWith("image/")) {
      // 아바타 이미지 업로드
      const { data, error } = await client.storage
        .from("avatars")
        .upload(`${userId}/${Date.now()}`, avatar, {
          contentType: avatar.type,
          upsert: true,
        });

      if (error) {
        console.log(error);
        return {
          formError: {
            avatar: ["아바타 이미지 업로드에 실패했습니다."],
          },
        };
      }
      const {
        data: { publicUrl },
      } = await client.storage
        .from("avatars")
        .getPublicUrl(data.path);

      await updateUserAvatar(client, {
        id: userId,
        avatarUrl: publicUrl,
      });
    } else {
      return {
        formError: {
          avatar: ["용량이 너무 크거나 이미지 파일이 아닙니다."],
        },
      };
    }
  } else {
    const { success, data, error } = formSchema.safeParse(
      Object.fromEntries(formData)
    );

    if (!success) {
      return { fieldError: error.flatten().fieldErrors };
    }

    const { name, role, headline, bio, username } = data;

    const isUsernameAvailable = await checkUsernameAvailability(
      client,
      username,
      userId
    );

    if (!isUsernameAvailable) {
      return {
        fieldError: { username: ["이미 사용중인 별명입니다."] },
      };
    }

    await updateUser(client, {
      id: userId,
      name,
      role: role as
        | "독서 리뷰"
        | "창작 글쓰기"
        | "시/에세이"
        | "전문 글쓰기"
        | "독서 토론",
      headline,
      username,
      bio,
    });

    return { ok: true };
  }
};

export default function SettingsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [avatar, setAvatar] = useState<string | null>(
    loaderData.user.avatar
  );
  const onChangeAvatar = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-6 gap-10">
        <main className="col-span-4 flex flex-col gap-10">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <Form method="post" className="flex flex-col gap-5 w-1/2">
            <InputPair
              label="이름"
              name="name"
              placeholder="홍길동"
              type="text"
              defaultValue={loaderData.user.name}
              id="name"
              required
              description="사용자의 실명을 입력해주세요."
            />
            {actionData?.fieldError?.name && (
              <Alert>
                <AlertTitle>알림</AlertTitle>
                <AlertDescription>
                  {actionData.fieldError.name.join(", ")}
                </AlertDescription>
              </Alert>
            )}
            <InputPair
              label="별명"
              name="username"
              placeholder="홍길동"
              type="text"
              defaultValue={loaderData.user.username}
              id="username"
              required
              description="앱에서 사용할 이름을 입력해주세요."
            />
            {actionData?.fieldError?.username && (
              <Alert>
                <AlertTitle className="text-red-500 font-bold border-none">
                  {actionData.fieldError.username.join(", ")}
                </AlertTitle>
              </Alert>
            )}
            <SelectPair
              label="관심 분야"
              name="role"
              placeholder="선택하기"
              defaultValue={loaderData.user.role ?? "독서 리뷰"}
              options={[
                { label: "독서 리뷰", value: "독서 리뷰" },
                { label: "창작 글쓰기", value: "창작 글쓰기" },
                { label: "시/에세이", value: "시/에세이" },
                {
                  label: "전문 글쓰기",
                  value: "전문 글쓰기",
                },
                { label: "독서 토론", value: "독서 토론" },
              ]}
              description="주로 어떤 활동을 하시나요?"
            />
            {actionData?.fieldError?.role && (
              <Alert>
                <AlertTitle>알림</AlertTitle>
                <AlertDescription>
                  {actionData.fieldError.role.join(", ")}
                </AlertDescription>
              </Alert>
            )}
            <InputPair
              label="헤드라인"
              name="headline"
              placeholder="예) 프론트엔드 개발자 | UX 디자이너"
              type="text"
              defaultValue={loaderData.user.headline ?? ""}
              id="headline"
              required
              description="프로필 상단에 표시될 짧은 소개문구를 작성해주세요. (예: 직함, 전문분야 등)"
            />
            {actionData?.fieldError?.headline && (
              <Alert>
                <AlertTitle>알림</AlertTitle>
                <AlertDescription>
                  {actionData.fieldError.headline.join(", ")}
                </AlertDescription>
              </Alert>
            )}
            <InputPair
              label="소개글"
              name="bio"
              placeholder="안녕하세요!"
              type="text"
              id="bio"
              defaultValue={loaderData.user.bio ?? ""}
              required
              textarea
              description="자신을 소개하는 짧은 글을 작성해주세요."
            />
            {actionData?.fieldError?.bio && (
              <Alert>
                <AlertTitle>알림</AlertTitle>
                <AlertDescription>
                  {actionData.fieldError.bio}
                </AlertDescription>
              </Alert>
            )}
            <Button className="w-full">프로필 업데이트</Button>
            {actionData?.ok && (
              <Alert>
                <AlertTitle className="font-bold">알림</AlertTitle>
                <AlertDescription className="text-green-500">
                  프로필이 정상적으로 업데이트 되었습니다.
                </AlertDescription>
              </Alert>
            )}
          </Form>
        </main>

        {/* 프로필 이미지 */}
        <Form
          className="col-span-2 p-6 round shadow-md round-lg"
          method="post"
          encType="multipart/form-data"
        >
          <span className="text-lg font-bold text-muted-foreground uppercase">
            프로필 이미지
          </span>
          <div className="flex flex-col gap-5">
            <div className="size-40 rounded-full shadow-lg overflow-hidden">
              {avatar ? (
                <img
                  src={avatar}
                  alt="product 미리보기"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="size-40 rounded-xl shadow-lg overflow-hidden flex items-center justify-center text-muted-foreground">
                  이미지를 첨부해주세요
                </div>
              )}
            </div>
            <Input
              type="file"
              name="avatar"
              className=" w-full"
              onChange={onChangeAvatar}
              required
            />
            {actionData?.formError?.avatar && (
              <Alert>
                <AlertTitle>알림</AlertTitle>
                <AlertDescription>
                  {actionData.formError.avatar.join(", ")}
                </AlertDescription>
              </Alert>
            )}
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setAvatar(null)}
            >
              이미지 초기화
            </Button>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">
                Recommend size: 1200x600px
              </span>
              <span className="text-xs text-muted-foreground">
                Recommend file size: 1MB
              </span>
              <span className="text-xs text-muted-foreground">
                Recommend file type: PNG, JPG, JPEG
              </span>
            </div>

            <Button
              variant="default"
              size="sm"
              className="w-full"
              onClick={() => setAvatar(null)}
            >
              프로필 이미지 업데이트
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
