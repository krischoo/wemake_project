import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "../queries-profiles";
import { Route } from "./+types/dashboard-page";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const { data, error } = await client
    .rpc("get_dashboard_stats", {
      user_id: userId,
    })
    .select();
  if (error) {
    throw error;
  }
  return { chartData: data };
};

// const chartData = [
//   { month: "January", views: 186 },
//   { month: "February", views: 305 },
//   { month: "March", views: 237 },
//   { month: "April", views: 73 },
//   { month: "May", views: 209 },
//   { month: "June", views: 214 },
// ];
const chartConfig = {
  views: {
    label: "👁️",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function DashboardPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold mb-10 pb-4 sticky top-0 bg-white">
        대시보드
      </h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>프로필 조회수</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={loaderData.chartData}
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
                padding={{ left: 15, right: 15 }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="views"
                type="natural"
                stroke="var(--color-views)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
