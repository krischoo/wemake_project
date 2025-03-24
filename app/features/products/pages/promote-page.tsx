import { useState } from "react";
import { Form } from "react-router";
import { Route } from "./+types/promote-page";
import Hero from "~/common/components/hero";

import { DateRange } from "react-day-picker";
import { DateTime } from "luxon";

import SelectPair from "~/common/components/select-pair";

import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "~/common/components/ui/label";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Promote Product | writenow" },
    { name: "description", content: "Promote your product" },
  ];
};

export default function PromotePage() {
  const [promotionPeriod, setPromotionPeriod] = useState<
    DateRange | undefined
  >();
  const totalDays =
    promotionPeriod?.from && promotionPeriod.to
      ? DateTime.fromJSDate(promotionPeriod.to).diff(
          DateTime.fromJSDate(promotionPeriod.from),
          "days"
        ).days
      : 0;

  return (
    <div>
      <Hero
        title="Promote Your Product"
        subtitle="Boost your product's visibility"
      />
      <Form className="max-w-sm mx-auto flex flex-col gap-10 items-center">
        <SelectPair
          label="Product Name"
          name="productName"
          placeholder="Select your product"
          options={[
            {
              label: "AI Dark Mode Maker",
              value: "ai-dark-mode-maker",
            },
            {
              label: "AI Image Generator",
              value: "ai-image-generator",
            },
            { label: "AI Code Editor", value: "ai-code-editor" },
            { label: "AI Chatbot", value: "ai-chatbot" },
            {
              label: "AI Writing Assistant",
              value: "ai-writing-assistant",
            },
          ]}
          description="Select the product you want to promote"
        />
        <div className="flex flex-col gap-4 items-start">
          <Label className="flex flex-col gap-1 items-center">
            Select a range of dates for promotion
            <small className="text-muted-foreground">
              Minimum 3 days
            </small>
          </Label>

          <Calendar
            mode="range"
            selected={promotionPeriod}
            onSelect={setPromotionPeriod}
            min={3}
            disabled={[{ before: new Date() }]} // 과거 날짜 비활성화
          />
        </div>
        <Button disabled={totalDays === 0}>
          Go to Checkout (${totalDays * 10})
        </Button>
      </Form>
    </div>
  );
}
