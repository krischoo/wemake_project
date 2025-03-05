import { Link } from "react-router";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Badge } from "@/common/components/ui/badge";

interface JobCardProps {
	id: string;
	company: string;
	companyLogoUrl: string;
	title: string;
	postedAt: string;
	type: string;
	positionLocation: string;
	companyHq: string;
	salary: string;
}

export function JobCard({
	id,
	company,
	companyLogoUrl,
	title,
	postedAt,
	type,
	positionLocation,
	companyHq,
	salary,
}: JobCardProps) {
	return (
		<Link to={`/jobs/${id}`}>
			<Card className="bg-transparent transition-colors hover:bg-card/50">
				<CardHeader>
					<div className="flex items-center gap-4 mb-2">
						<img src={companyLogoUrl} className="size-10 rounded-full" />
						<div className="space-x-2">
							<span className="text-lg font-bold">{company}</span>
							<span className="text-xs text-muted-foreground">{postedAt}</span>
						</div>
					</div>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent className="space-x-1">
					<Badge variant="outline">{type}</Badge>
					<Badge variant="outline">{positionLocation}</Badge>
				</CardContent>
				<CardFooter className="flex justify-between">
					<div className="flex flex-col">
						<span className="text-sm font-semibold text-muted-foreground">
							{salary}
						</span>
						<span className="text-sm font-semibold text-muted-foreground">
							{companyHq}
						</span>
					</div>
					<Button variant="secondary" size="sm">
						Apply now
					</Button>
				</CardFooter>
			</Card>
		</Link>
	);
}
