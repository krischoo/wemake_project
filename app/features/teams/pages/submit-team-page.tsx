import Hero from "~/common/components/hero";
import { Route } from "./+types/submit-team-page";
import { Form, redirect, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import {
  JOB_TYPES,
  LOCATION_TYPES,
  SALARY_RANGE,
} from "~/features/jobs/constants-jobs";
import { PRODUCT_STAGE } from "../constants-teams";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries-profiles";
import { z } from "zod";
import { createTeam } from "../mutations-teams";
import { LoaderCircleIcon } from "lucide-react";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "팀 제출 | writenow",
    },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
};

export const formSchema = z.object({
  product: z.string().min(1),
  stage: z.string().min(1),
  size: z.coerce.number().min(1).max(100),
  share: z.coerce.number().min(0).max(100),
  members: z.string().min(1),
  description: z.string().max(1000),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();

  const {
    success,
    data: parsedData,
    error,
  } = formSchema.safeParse(Object.fromEntries(formData));

  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors };
  }
  const { team_id } = await createTeam(client, userId, {
    ...parsedData,
  });

  return redirect(`/teams/${team_id}`);
};

export default function SubmitTeamPage({
  actionData,
}: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" ||
    navigation.state === "loading";
  return (
    <div className="space-y-10">
      <Hero title="팀 제출" subtitle="팀을 제출해보세요." />
      <Form
        className="max-w-screen-xl mx-auto flex flex-col gap-10 items-center"
        method="post"
      >
        <div className="grid grid-cols-3 gap-5 w-full">
          <InputPair
            id="product"
            label="어떤 제품입니까?"
            name="product"
            description="30자 이내로 입력해주세요"
            maxLength={30}
            type="text"
            required
            placeholder="제품 이름을 입력해주세요."
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData?.fieldErrors?.product?.join(", ")}
            </p>
          )}
          <SelectPair
            label="어떤 단계입니까?"
            description="제품의 단계를 선택해주세요."
            name="stage"
            required
            placeholder="제품 단계를 선택해주세요."
            options={PRODUCT_STAGE}
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData?.fieldErrors?.stage?.join(", ")}
            </p>
          )}
          <InputPair
            id="size"
            label="팀의 규모는 어떻습니까?"
            name="size"
            min={1}
            max={100}
            description="(1-100)"
            type="number"
            required
            placeholder="팀의 규모를 입력해주세요."
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData?.fieldErrors?.size?.join(", ")}
            </p>
          )}
          <InputPair
            id="share"
            label="지분을 얼마나 나눌 수 있습니까?"
            name="share"
            description="지분 비율을 입력해주세요 (0-100%)"
            type="number"
            min={0}
            max={100}
            required
            placeholder="예시: 20"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData?.fieldErrors?.share?.join(", ")}
            </p>
          )}
          <InputPair
            id="members"
            label="어떤 팀 멤버가 필요합니까?"
            name="members"
            description="쉼표로 구분해서 입력해주세요"
            type="text"
            required
            placeholder="예시: 프론트엔드, 백엔드, 디자이너"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData?.fieldErrors?.members?.join(", ")}
            </p>
          )}
          <InputPair
            id="description"
            label="당신의 제품에 관해 설명해주세요"
            name="description"
            description="최대 1000자"
            type="text"
            maxLength={1000}
            required
            placeholder="제품에 관해 설명해주세요."
            textarea
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData?.fieldErrors?.description?.join(", ")}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full max-w-lg mx-auto"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            "팀 생성하기"
          )}
        </Button>
      </Form>
    </div>
  );
}
