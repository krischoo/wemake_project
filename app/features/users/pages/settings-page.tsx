import Hero from "~/common/components/hero";
import { Route } from "./+types/settings-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Button } from "~/common/components/ui/button";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
export const meta: Route.MetaFunction = () => {
	return [
		{
			title: "설정 | writenow",
		},
	];
};

export default function SettingsPage() {
	const [avatar, setAvatar] = useState<string | null>(null);
	const onChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
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
					<Form className="flex flex-col gap-5 w-1/2">
						<InputPair
							label="이름"
							name="name"
							placeholder="홍길동"
							type="text"
							id="name"
							required
							description="사용자의 실명을 입력해주세요."
						/>
						<SelectPair
							label="관심 분야"
							name="interest"
							placeholder="선택하기"
							options={[
								{ label: "독서 리뷰", value: "book-review" },
								{ label: "창작 글쓰기", value: "creative-writing" },
								{ label: "시/에세이", value: "poetry-essay" },
								{ label: "전문 글쓰기", value: "professional-writing" },
								{ label: "독서 토론", value: "book-discussion" },
							]}
							description="주로 어떤 활동을 하시나요?"
						/>
						<InputPair
							label="헤드라인"
							name="headline"
							placeholder="예) 프론트엔드 개발자 | UX 디자이너"
							type="text"
							id="headline"
							required
							description="프로필 상단에 표시될 짧은 소개문구를 작성해주세요. (예: 직함, 전문분야 등)"
						/>
						<InputPair
							label="소개글"
							name="bio"
							placeholder="안녕하세요!"
							type="text"
							id="bio"
							required
							textarea
							description="자신을 소개하는 짧은 글을 작성해주세요."
						/>
						<Button className="w-full">프로필 업데이트</Button>
					</Form>
				</main>
				<aside className="col-span-2 p-6 round shadow-md round-lg">
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
							name="productImage"
							className=" w-full"
							onChange={onChangeAvatar}
							required
						/>
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
				</aside>
			</div>
		</div>
	);
}
