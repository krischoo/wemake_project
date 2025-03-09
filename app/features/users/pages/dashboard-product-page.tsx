import {
	Area,
	AreaChart,
	CartesianGrid,
	Line,
	LineChart,
	XAxis,
} from "recharts";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "~/common/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "~/common/components/ui/chart";
import { Route } from "./+types/dashboard-product-page";

const chartData = [
	{ month: "January", views: 186, visitors: 100 },
	{ month: "February", views: 305, visitors: 178 },
	{ month: "March", views: 237, visitors: 133 },
	{ month: "April", views: 73, visitors: 63 },
	{ month: "May", views: 209, visitors: 171 },
	{ month: "June", views: 214, visitors: 51 },
];
const chartConfig = {
	views: {
		label: "Page Views",
		color: "hsl(var(--primary))",
	},
	visitors: {
		label: "Visitors",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

export const meta: Route.MetaFunction = () => {
	return [
		{
			title: "대시보드 | writenow",
			description: "대시보드",
		},
	];
};

export default function DashboardProductPage() {
	return (
		<div className="space-y-5">
			<h1 className="text-2xl font-semibold mb-10 pb-4 sticky top-0 bg-white">
				분석
			</h1>
			<Card className="w-1/2">
				<CardHeader>
					<CardTitle>실적</CardTitle>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfig}>
						<AreaChart
							accessibilityLayer
							data={chartData}
							margin={{
								left: 12,
								right: 12,
							}}
						>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								tickFormatter={(value) => value.slice(0, 3)}
							/>
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent indicator="dot" />}
							/>

							<Area
								dataKey="views"
								type="natural"
								stroke="var(--color-views)"
								fill="var(--color-views)"
								strokeWidth={2}
								dot={false}
								stackId="1"
								fillOpacity={0.6}
							/>
							<Area
								dataKey="visitors"
								type="natural"
								stroke="var(--color-visitors)"
								fill="var(--color-visitors)"
								strokeWidth={2}
								dot={false}
								stackId="1"
								fillOpacity={0.6}
							/>
						</AreaChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</div>
	);
}
