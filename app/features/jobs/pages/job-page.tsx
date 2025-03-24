import { DotIcon } from "lucide-react";
import { Route } from "./+types/job-page";
import Hero from "~/common/components/hero";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { getJobById } from "../queries-jobs";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";
export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: `${data.job.position} | writenow` },
    { name: "description", content: "Job" },
  ];
};

export async function loader({ params, request }: Route.LoaderArgs) {
  const { client } = makeSSRClient(request);
  const job = await getJobById(client, Number(params.jobId));
  return { job };
}

export default function JobPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div>
      <div className="bg-gradient-to-tr from-primary/50 to-primary/20 h-60 w-full rounded-lg"></div>
      <div className="grid grid-cols-6 items-start gap-20 -mt-20">
        {/* 메인 컨텐츠 */}
        <div className="col-span-4 space-y-10">
          <div className="space-y-2">
            <div>
              <img
                src={loaderData.job.company_logo}
                className="rounded-full border-2 border-white size-40 relative left-10"
              />
            </div>
            <h1 className="text-4xl font-bold">
              {loaderData.job.position}
            </h1>
            <h4 className="text-lg text-muted-foreground">
              {loaderData.job.company_name}
            </h4>
          </div>
          <div className="flex gap-2 capitalize">
            <Badge>{loaderData.job.job_type}</Badge>
            <Badge>{loaderData.job.location}</Badge>
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-muted-foreground text-lg">
              {loaderData.job.overview}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">Responsibilities</h4>
            <ul className=" text-lg list-disc list-inside">
              {loaderData.job.responsibilities
                .split(",")
                .map((item) => (
                  <li key={item}>{item}</li>
                ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className=" text-lg list-disc list-inside">
              {loaderData.job.qualifications
                .split(",")
                .map((item) => (
                  <li key={item}>{item}</li>
                ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-2xl font-bold">Skills</h4>
            <ul className=" text-lg list-disc list-inside">
              {loaderData.job.skills.split(",").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 사이드바 */}
        <div className="col-span-2 sticky mt-32 top-20 border rounded-lg p-6 space-y-6">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">
              salary
            </span>
            <span className="text-2xl font-bold">
              {loaderData.job.salary_range}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">
              Location
            </span>
            <span className="text-2xl font-bold capitalize">
              {loaderData.job.location}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">
              Type
            </span>
            <span className="text-2xl font-bold capitalize">
              {loaderData.job.job_type}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {DateTime.fromISO(
                loaderData.job.created_at
              ).toRelative()}{" "}
              게시됨
            </span>
            <DotIcon className="size-4" />
            <span className="text-sm text-muted-foreground">
              395 views
            </span>
          </div>
          <Button className="w-full">Apply now</Button>
        </div>
      </div>
    </div>
  );
}
