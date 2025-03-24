import { Form, redirect, useNavigation } from "react-router";
import { Route } from "./+types/submit-job-page";
import Hero from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import {
  JOB_TYPES,
  LOCATION_TYPES,
  SALARY_RANGE,
} from "../constants-jobs";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries-profiles";
import { z } from "zod";
import { createJob } from "../mutations-jobs";
import { LoaderCircleIcon } from "lucide-react";

export const meta: Route.MetaFunction = () => {
  return [
    { title: `Post a Job | writenow` },
    { name: "description", content: "Post a Job" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
};

export const formSchema = z.object({
  position: z.string().min(1, "Position is required"),
  overview: z.string().min(1, "Overview is required"),
  responsibilities: z.string().min(1, "Responsibilities is required"),
  qualifications: z.string().min(1, "Qualifications is required"),
  skills: z.string().min(1, "Skills is required"),
  companyName: z.string().min(1, "Company Name is required"),
  companyLogoUrl: z.string().min(1, "Company Logo URL is required"),
  applyUrl: z.string().min(1, "Apply URL is required"),
  jobType: z.enum(
    JOB_TYPES.map((type) => type.value) as [string, ...string[]]
  ),
  jobLocation: z.enum(
    LOCATION_TYPES.map((location) => location.value) as [
      string,
      ...string[]
    ]
  ),
  salaryRange: z.enum(SALARY_RANGE),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const formData = await request.formData();
  const userId = await getLoggedInUserId(client);

  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    return {
      fieldErrors: error.flatten().fieldErrors,
    };
  }
  const { job_id } = await createJob(client, data);
  return redirect(`/jobs/${job_id}`);
};

export default function SubmitJobPage({
  actionData,
}: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" ||
    navigation.state === "loading";
  return (
    <div>
      <Hero
        title="Post a Job"
        subtitle="Reach out to the developers in the world"
      />
      <Form
        className="max-w-screen-xl mx-auto flex flex-col gap-10 items-center"
        method="post"
      >
        <div className="grid grid-cols-3 gap-5 w-full">
          <InputPair
            id="position"
            label="Position"
            description="40 characters max"
            name="position"
            maxLength={40}
            type="text"
            required
            placeholder="e.g. Frontend Developer"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors?.position?.[0]}
            </p>
          )}
          <InputPair
            id="overview"
            label="Overview"
            description="1000 characters max"
            name="overview"
            maxLength={1000}
            type="text"
            required
            textarea
            placeholder="e.g. Frontend Developer"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors?.overview?.[0]}
            </p>
          )}

          {/* 리스트 형식으로 들어감 */}
          <InputPair
            id="responsibilities"
            label="Responsibilities"
            description="1000 characters max, comma separated"
            name="responsibilities"
            maxLength={1000}
            type="text"
            required
            textarea
            placeholder="e.g. Implementing UI components, Writing code, etc."
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors?.responsibilities?.[0]}
            </p>
          )}

          <InputPair
            id="qualifications"
            label="Qualifications"
            description="1000 characters max, comma separated"
            name="qualifications"
            maxLength={1000}
            type="text"
            required
            textarea
            placeholder="e.g. Bachelor's degree in Computer Science, 2 years of experience in React, etc."
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors?.qualifications?.[0]}
            </p>
          )}
          <InputPair
            id="skills"
            label="Skills"
            description="1000 characters max, comma separated"
            name="skills"
            maxLength={1000}
            type="text"
            required
            textarea
            placeholder="e.g. React, TypeScript, etc."
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors?.skills?.[0]}
            </p>
          )}
          <InputPair
            id="company-name"
            label="Company Name"
            description="40 characters max"
            name="companyName"
            maxLength={40}
            type="text"
            required
            placeholder="e.g. React, TypeScript, etc."
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors?.companyName?.[0]}
            </p>
          )}
          <InputPair
            id="company-logo-url"
            label="Company Logo URL"
            description="40 characters max"
            name="companyLogoUrl"
            maxLength={40}
            type="text"
            required
            placeholder="e.g. https://example.com/logo.png"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors?.companyLogoUrl?.[0]}
            </p>
          )}
          <InputPair
            id="apply-url"
            label="Apply URL"
            description="40 characters max"
            name="applyUrl"
            maxLength={40}
            type="text"
            required
            placeholder="e.g. https://example.com/apply"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors?.applyUrl?.[0]}
            </p>
          )}
          <SelectPair
            label="Job Type"
            description="Select the type of job"
            name="jobType"
            required
            placeholder="Select the type of job"
            options={JOB_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />
          <SelectPair
            label="Job Location"
            description="Select the location of the job"
            name="jobLocation"
            required
            placeholder="Select the location of the job"
            options={LOCATION_TYPES.map((location) => ({
              label: location.label,
              value: location.value,
            }))}
          />
          <SelectPair
            label="Salary Range"
            description="Select the salary range of the job"
            name="salaryRange"
            required
            placeholder="Select the salary range of the job"
            options={SALARY_RANGE.map((salary) => ({
              label: salary,
              value: salary,
            }))}
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors?.salaryRange?.[0]}
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
            "Post a Job for $100"
          )}
        </Button>
      </Form>
    </div>
  );
}
