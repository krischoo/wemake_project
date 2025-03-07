import Hero from "~/common/components/hero";
import { Route } from "./+types/submit-team-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import {
	JOB_TYPES,
	LOCATION_TYPES,
	SALARY_RANGE,
} from "~/features/jobs/constants-jobs";

export const meta: Route.MetaFunction = () => {
	return [
		{
			title: "팀 제출 | writenow",
		},
	];
};

export default function SubmitTeamPage() {
	return (
		<div className="space-y-10">
			<Hero title="팀 제출" subtitle="팀을 제출해보세요." />
			<Form className="max-w-screen-xl mx-auto flex flex-col gap-10 items-center">
				<div className="grid grid-cols-3 gap-5 w-full">
					<InputPair
						id="name"
						label="어떤 목적입니까?"
						name="name"
						description="30자 이내로 입력해주세요"
						maxLength={30}
						type="text"
						required
						placeholder="팀 이름을 입력해주세요."
					/>
					<SelectPair
						label="어떤 목적입니까?"
						description="팀 목적을 선택해주세요."
						name="purpose"
						required
						placeholder="팀 목적을 선택해주세요."
						options={[
							{
								label: "프로젝트 진행",
								value: "project",
							},
							{
								label: "스터디 모임",
								value: "study",
							},
							{
								label: "창업 준비",
								value: "startup",
							},
							{
								label: "대회/공모전",
								value: "competition",
							},
							{
								label: "기타",
								value: "etc",
							},
						]}
					/>
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
					<InputPair
						id="meal"
						label="오늘 점심 식사는 무엇입니까?"
						name="meal"
						description="최대 5개"
						type="text"
						required
						placeholder="예시: 라면, 치즈볼, 치즈퐁듀"
					/>
					<InputPair
						id="members"
						label="어떤 팀 멤버가 필요합니까?"
						name="members"
						description="쉼표로 구분해서 입력해주세요"
						type="text"
						required
						placeholder="예시: 프론트엔드, 백엔드, 디자이너"
					/>
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
				</div>
				<Button type="submit" className="w-full max-w-lg mx-auto" size="lg">
					팀 생성하기
				</Button>
			</Form>
		</div>
	);
}
