// 외부 라이브러리 임포트
import { Form } from "react-router";
import { useState } from "react";

// 로컬 타입 임포트
import { Route } from "./+types/submit-page";

// 공통 컴포넌트 임포트
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";

import Hero from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Submit Product | writenow" },
		{ name: "description", content: "Submit your product" },
	];
};

export default function SubmitPage({ actionData }: Route.ComponentProps) {
	const [image, setImage] = useState<string | null>(null);
	const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const file = event.target.files[0];
			setImage(URL.createObjectURL(file));
		}
	};
	return (
		<div>
			<Hero
				title="Submit Product"
				subtitle="Share your creation with the world"
			/>
			<Form className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto">
				<div className="space-y-10">
					<InputPair
						label="Name"
						description="This is the name of your product"
						id="productName"
						name="productName"
						type="text"
						required
						placeholder="My Product"
					/>
					<InputPair
						label="Tagline"
						description="This is the tagline of your product"
						id="productTagline"
						name="productTagline"
						type="text"
						required
						placeholder="My Product is a product that does something"
					/>
					<InputPair
						label="URL"
						description="This is the URL of your product"
						id="productUrl"
						name="productUrl"
						type="url"
						required
						placeholder="https://myproduct.com"
					/>
					<InputPair
						label="Description"
						description="This is the description of your product"
						id="productDescription"
						name="productDescription"
					/>
					<InputPair
						label="Category"
						description="This is the category of your product"
						id="productCategory"
						name="productCategory"
						textarea={true}
						placeholder="This is the category of my product"
					/>
					<SelectPair
						label="Category"
						description="This is the category of your product"
						name="productCategory"
						placeholder="Select a category"
						options={[
							{ label: "Light", value: "light" },
							{ label: "Dark", value: "dark" },
							{ label: "System", value: "system" },
							{ label: "Other", value: "other" },
						]}
					/>
					<Button type="submit" className="w-full" size="lg">
						Submit
					</Button>
				</div>
				<div className="flex flex-col gap-1">
					<Label htmlFor="productImage" className="flex flex-col gap-1">
						Product Image
						<small className="text-muted-foreground">
							Upload a product image
						</small>
					</Label>
					<Input
						type="file"
						name="productImage"
						className=" w-full"
						onChange={onChangeImage}
						required
					/>
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
					<div className="size-40 rounded-xl shadow-lg overflow-hidden">
						{image ? (
							<img
								src={image}
								alt="product 미리보기"
								className="object-cover w-full h-full"
							/>
						) : (
							<div className="size-40 rounded-xl shadow-lg overflow-hidden flex items-center justify-center text-muted-foreground">
								이미지를 첨부해주세요
							</div>
						)}
					</div>
					<Button
						variant="outline"
						size="sm"
						className="w-full"
						onClick={() => setImage(null)}
					>
						이미지 초기화
					</Button>
				</div>
			</Form>
		</div>
	);
}
