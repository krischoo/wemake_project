import { Form } from "react-router";
import { Route } from "./+types/submit-job-page";
import Hero from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constants-jobs";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: `Post a Job | writenow` },
		{ name: "description", content: "Post a Job" },
	];
};

export default function SubmitJobPage() {
	return (
		<div>
			<Hero
				title="Post a Job"
				subtitle="Reach out to the developers in the world"
			/>
			<Form className="max-w-screen-xl mx-auto flex flex-col gap-10 items-center">
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
					<InputPair
						id="company-name"
						label="Company Name"
						description="40 characters max"
						name="company-name"
						maxLength={40}
						type="text"
						required
						placeholder="e.g. React, TypeScript, etc."
					/>
					<InputPair
						id="company-logo-url"
						label="Company Logo URL"
						description="40 characters max"
						name="company-logo-url"
						maxLength={40}
						type="text"
						required
						placeholder="e.g. https://example.com/logo.png"
					/>
					<InputPair
						id="apply-url"
						label="Apply URL"
						description="40 characters max"
						name="apply-url"
						maxLength={40}
						type="text"
						required
						placeholder="e.g. https://example.com/apply"
					/>
					<SelectPair
						label="Job Type"
						description="Select the type of job"
						name="job-type"
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
						name="job-location"
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
						name="salary-range"
						required
						placeholder="Select the salary range of the job"
						options={SALARY_RANGE.map((salary) => ({
							label: salary,
							value: salary,
						}))}
					/>
				</div>
				<Button type="submit" className="w-full max-w-lg mx-auto" size="lg">
					Post a Job for $100
				</Button>
			</Form>
		</div>
	);
}
