import { DotIcon } from "lucide-react";
import { Route } from "./+types/job-page";
import Hero from "~/common/components/hero";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
export const meta: Route.MetaFunction = () => {
	return [{ title: `Job | writenow` }, { name: "description", content: "Job" }];
};

export default function JobPage() {
	return (
		<div>
			<div className="bg-gradient-to-tr from-primary/50 to-primary/20 h-60 w-full rounded-lg"></div>
			<div className="grid grid-cols-6 items-start gap-20 -mt-20">
				{/* 메인 컨텐츠 */}
				<div className="col-span-4 space-y-10">
					<div className="space-y-2">
						<div>
							<img
								src="https://github.com/audi.png"
								className="rounded-full border-2 border-white size-40 relative left-10"
							/>
						</div>
						<h1 className="text-4xl font-bold">Car driver</h1>
						<h4 className="text-lg text-muted-foreground">Audi</h4>
					</div>
					<div className="flex gap-2">
						<Badge>Full-time</Badge>
						<Badge>Remote</Badge>
					</div>
					<div className="space-y-2">
						<h4 className="text-2xl font-bold">Overview</h4>
						<p className="text-muted-foreground text-lg">
							Car driver is a job that requires a driver to drive a car.
							especially when the weather is bad. Car driver is a job that
							requires a driver to drive a car. especially when the weather is
							bad.
						</p>
					</div>
					<div className="space-y-2">
						<h4 className="text-2xl font-bold">Responsibilities</h4>
						<ul className=" text-lg list-disc list-inside">
							{[
								"Driving",
								"Car maintenance",
								"Customer service",
								"Reporting",
							].map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</div>
					<div className="space-y-2">
						<h4 className="text-2xl font-bold">Qualifications</h4>
						<ul className=" text-lg list-disc list-inside">
							{[
								"Driving license",
								"No major traffic violations",
								"No criminal record",
								"No drug use",
							].map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</div>
					<div className="space-y-2">
						<h4 className="text-2xl font-bold">Benefits</h4>
						<ul className=" text-lg list-disc list-inside">
							{[
								"High salary",
								"Flexible working hours",
								"Health insurance",
								"Car insurance",
							].map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</div>
					<div className="space-y-2">
						<h4 className="text-2xl font-bold">Skills</h4>
						<ul className=" text-lg list-disc list-inside">
							{[
								"Driving license",
								"Customer service",
								"Reporting",
								"Car maintenance",
								"Driving",
							].map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</div>
				</div>

				{/* 사이드바 */}
				<div className="col-span-2 sticky mt-32 top-20 border rounded-lg p-6 space-y-6">
					<div className="flex flex-col">
						<span className="text-sm text-muted-foreground">salary</span>
						<span className="text-2xl font-bold">3,000만원 ~ 5,000만원</span>
					</div>
					<div className="flex flex-col">
						<span className="text-sm text-muted-foreground">Location</span>
						<span className="text-2xl font-bold">원격 근무</span>
					</div>
					<div className="flex flex-col">
						<span className="text-sm text-muted-foreground">Type</span>
						<span className="text-2xl font-bold">Full-time</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-sm text-muted-foreground">
							Posted 2days ago
						</span>
						<DotIcon className="size-4" />
						<span className="text-sm text-muted-foreground">343 views</span>
					</div>
					<Button className="w-full">Apply now</Button>
				</div>
			</div>
		</div>
	);
}
