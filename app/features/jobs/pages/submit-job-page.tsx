import { Form } from "react-router";
import { Route } from "./+types/submit-job-page";
import Hero from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";

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
			<Form>
				<div className="grid grid-cols-3 gap-5">
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
				</div>
			</Form>
		</div>
	);
}
