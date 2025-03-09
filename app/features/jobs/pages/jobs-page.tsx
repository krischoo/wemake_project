import { Route } from "./+types/jobs-page";
import Hero from "~/common/components/hero";
import { JobCard } from "~/features/jobs/components/job-card";
import { Button } from "~/common/components/ui/button";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constants-jobs";
import { Link } from "react-router";
import { useSearchParams } from "react-router";
import { cn } from "~/lib/utils";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: `Jobs | writenow` },
		{ name: "description", content: "Jobs" },
	];
};

export default function JobsPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const onFilterClick = (key: string, value: string) => {
		searchParams.set(key, value);
		setSearchParams(searchParams);
	};

	return (
		<div className="space-y-20">
			<Hero title="Jobs" subtitle="We are looking for best writers" />
			<div className="grid grid-cols-1 xl:grid-cols-6 items-start gap-20">
				{/* 메인 컨텐츠 */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4 col-span-4 gap-5">
					{Array.from({ length: 18 }).map((_, index) => (
						<JobCard
							id="jobId"
							company="Tesla"
							companyLogoUrl="https://github.com/facebook.png"
							title="Software Engineer"
							postedAt="12 hours ago"
							type="Full-time"
							positionLocation="Remote"
							companyHq="San Francisco, CA"
							salary="$100,000 - $120,000"
						/>
					))}
				</div>

				{/* 사이드바 */}
				<div className="xl:col-span-2 flex flex-col gap-10 sticky top-20">
					<div className="flex flex-col items-start gap-2">
						<h4 className="text-sm text-muted-foreground font-bold">Type</h4>
						<div className="flex flex-wrap gap-2">
							{JOB_TYPES.map((type) => (
								<Button
									variant="outline"
									key={type.value}
									onClick={() => onFilterClick("type", type.value)}
									className={cn(
										type.value === searchParams.get("type") &&
											"bg-primary text-primary-foreground",
										"hover:bg-primary hover:text-primary-foreground"
									)}
								>
									{type.label}
								</Button>
							))}
						</div>
					</div>
					<div className="flex flex-col items-start gap-2">
						<h4 className="text-sm text-muted-foreground font-bold">
							Location
						</h4>
						<div className="flex flex-wrap gap-2">
							{LOCATION_TYPES.map((type) => (
								<Button
									variant="outline"
									key={type.value}
									onClick={() => onFilterClick("location", type.value)}
									className={cn(
										type.value === searchParams.get("location") &&
											"bg-primary text-primary-foreground",
										"hover:bg-primary hover:text-primary-foreground"
									)}
								>
									{type.label}
								</Button>
							))}
						</div>
					</div>
					<div className="flex flex-col items-start gap-2">
						<h4 className="text-sm text-muted-foreground font-bold">
							Salary Range
						</h4>
						<div className="flex flex-wrap gap-2">
							{SALARY_RANGE.map((range) => (
								<Button
									variant="outline"
									onClick={() => onFilterClick("salary", range)}
									className={cn(
										range === searchParams.get("salary") &&
											"bg-primary text-primary-foreground",
										"hover:bg-primary hover:text-primary-foreground"
									)}
								>
									{range}
								</Button>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
