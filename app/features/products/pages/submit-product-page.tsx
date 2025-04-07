// 외부 라이브러리 임포트
import { Form, redirect } from "react-router";
import { useState } from "react";

// 로컬 타입 임포트
import { Route } from "./+types/submit-product-page";

// 공통 컴포넌트 임포트
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";

import Hero from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { makeSSRClient } from "~/supa-client";
import {
  getLoggedInUserId,
  getUserById,
} from "~/features/users/queries-profiles";
import { z } from "zod";
import { getCategories } from "../queries-products";
import { createProduct } from "../mutations-products";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Product | writenow" },
    { name: "description", content: "Submit your product" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const categories = await getCategories(client);
  return { categories };
};

const formSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  url: z.string().min(1),
  description: z.string().min(1),
  howItWorks: z.string().min(1),
  category: z.coerce.number(),
  icon: z.instanceof(File).refine((file) => {
    return file.size <= 2097152 && file.type.startsWith("image/");
  }),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);

  const formData = await request.formData();

  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }
  const { icon, ...rest } = data;

  /* 아이콘 업로드 */
  const { data: uploadData, error: uploadError } =
    await client.storage
      .from("icons")
      .upload(`${userId}/${Date.now()}`, icon, {
        contentType: icon.type,
        upsert: false,
      });

  if (uploadError) {
    return {
      uploadError: ["업로드에 실패했습니다."],
    };
  }

  /* icon의 URL 가져오기 */
  const {
    data: { publicUrl },
  } = await client.storage
    .from("icons")
    .getPublicUrl(uploadData.path);

  /* Product 생성하기 */
  const productId = await createProduct(client, {
    name: rest.name,
    tagline: rest.tagline,
    url: rest.url,
    description: rest.description,
    categoryId: rest.category,
    icon: publicUrl,
    userId,
    howItWorks: rest.howItWorks,
  });

  return redirect(`/products/${productId}`);
};

export default function SubmitPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [image, setImage] = useState<string | null>(null);
  const onChangeImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      <Form
        method="post"
        encType="multipart/form-data"
        className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto"
      >
        <div className="space-y-10">
          <InputPair
            label="Name"
            description="This is the name of your product"
            id="name"
            name="name"
            type="text"
            required
            placeholder="My Product"
          />
          {actionData?.formErrors?.name && (
            <p className="text-red-500">
              {actionData.formErrors.name}
            </p>
          )}
          <InputPair
            label="Tagline"
            description="This is the tagline of your product"
            id="tagline"
            name="tagline"
            type="text"
            required
            placeholder="My Product is a product that does something"
          />
          {actionData?.formErrors?.tagline && (
            <p className="text-red-500">
              {actionData.formErrors.tagline}
            </p>
          )}
          <InputPair
            label="URL"
            description="This is the URL of your product"
            id="url"
            name="url"
            type="url"
            required
            placeholder="https://myproduct.com"
          />
          {actionData?.formErrors?.url && (
            <p className="text-red-500">
              {actionData.formErrors.url}
            </p>
          )}
          <InputPair
            label="Description"
            description="This is the description of your product"
            id="description"
            name="description"
            textarea={true}
            placeholder="This is the description of my product"
          />
          {actionData?.formErrors?.description && (
            <p className="text-red-500">
              {actionData.formErrors.description}
            </p>
          )}
          <SelectPair
            label="Category"
            description="This is the category of your product"
            name="category"
            required
            placeholder="Select a category"
            options={loaderData.categories.map((category) => ({
              label: category.name,
              value: category.category_id.toString(),
            }))}
          />
          {actionData?.formErrors?.category && (
            <p className="text-red-500">
              {actionData.formErrors.category}
            </p>
          )}
          <InputPair
            label="How it works"
            description="This is the how it works of your product"
            id="howItWorks"
            name="howItWorks"
            textarea={true}
            placeholder="This is the how it works of my product"
          />
          {actionData?.formErrors?.howItWorks && (
            <p className="text-red-500">
              {actionData.formErrors.howItWorks}
            </p>
          )}
          <Button type="submit" className="w-full" size="lg">
            Submit
          </Button>
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="icon" className="flex flex-col gap-1">
            Product Icon
            <small className="text-muted-foreground">
              Upload a product icon
            </small>
          </Label>
          <Input
            type="file"
            name="icon"
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
