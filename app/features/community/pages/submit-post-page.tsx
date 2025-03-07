import { Form } from "react-router";
import { Route } from "./+types/submit-post-page";

import Hero from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
export const meta: Route.MetaFunction = () => {
	return [
		{ title: "게시물 작성 | writenow" },
		{ name: "description", content: "게시물 작성 페이지입니다." },
	];
};
export default function SubmitPostPage() {
	return (
		<div className="space-y-10">
			<Hero title="게시물 작성" subtitle="게시물 작성 페이지입니다." />
			<Form className="flex flex-col gap-10 max-w-screen-md mx-auto">
				<InputPair
					label="제목"
					title="제목"
					id="title"
					name="title"
					placeholder="제목을 입력해주세요."
					required
					description="게시물의 제목을 입력해주세요."
				/>
				<SelectPair
					label="카테고리"
					name="category"
					placeholder="카테고리를 선택해주세요."
					required
					description="게시물의 카테고리를 선택해주세요."
					options={[
						/* 나중에 DB에서 가져옴 */
						{ label: "자유", value: "free" },
						{ label: "질문", value: "question" },
						{ label: "공지", value: "notice" },
					]}
				/>
				<InputPair
					label="콘텐츠"
					title="콘텐츠"
					id="content"
					name="content"
					placeholder="예) 저는 최근에 Notion을 사용하고 있는데, 다른 노트 앱을 추천해주실 수 있나요? 특히 마크다운 지원이 잘 되는 앱을 찾고 있습니다."
					required
					description="1,000자 이내로 작성해주세요."
					textarea
				/>
				<Button type="submit" className="w-1/3 mx-auto">
					게시물 작성
				</Button>
			</Form>
		</div>
	);
}
