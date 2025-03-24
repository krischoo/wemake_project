import { Route } from "./+types/jobs-page";
import Hero from "~/common/components/hero";
import { JobCard } from "~/features/jobs/components/job-card";
import { Button } from "~/common/components/ui/button";
import {
  JOB_TYPES,
  LOCATION_TYPES,
  SALARY_RANGE,
} from "../constants-jobs";
import { data, Link, isRouteErrorResponse } from "react-router";
import { useSearchParams } from "react-router";
import { cn } from "~/lib/utils";
import { getJobs } from "../queries-jobs";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: `Jobs | writenow` },
    { name: "description", content: "Jobs" },
  ];
};

const searchParamsSchema = z.object({
  type: z
    .enum(
      JOB_TYPES.map((type) => type.value) as [string, ...string[]]
    )
    .optional(),
  location: z
    .enum(
      LOCATION_TYPES.map((type) => type.value) as [
        string,
        ...string[]
      ]
    )
    .optional(),
  salary: z.enum(SALARY_RANGE).optional(),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    const { client } = makeSSRClient(request);
    const url = new URL(request.url);
    const { success, data: parsedData } =
      searchParamsSchema.safeParse(
        Object.fromEntries(url.searchParams)
      );
    if (!success) {
      throw data(
        {
          error_code: "INVALID_SEARCH_PARAMS",
          error_message: "잘못된 검색 조건입니다. 다시 시도해주세요.",
        },
        { status: 400 }
      );
    }
    const jobs = await getJobs(client, {
      limit: 30,
      location: parsedData.location as
        | (typeof LOCATION_TYPES)[number]["value"]
        | undefined,
      type: parsedData.type as
        | (typeof JOB_TYPES)[number]["value"]
        | undefined,
      salary: parsedData.salary as
        | (typeof SALARY_RANGE)[number]
        | undefined,
    });

    return { jobs };
  } catch (error) {
    if (error instanceof Error) {
      throw data(
        {
          error_code: "SERVER_ERROR",
          error_message:
            "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        },
        { status: 500 }
      );
    }
    throw error;
  }
};

export default function JobsPage({
  loaderData,
}: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const onFilterClick = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };
  const onFilterRemove = (key: string) => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  };

  const onFilterToggle = (key: string, value: string) => {
    if (value === searchParams.get(key)) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-20">
      <Hero title="Jobs" subtitle="We are looking for best writers" />
      <div className="grid grid-cols-1 xl:grid-cols-6 items-start gap-20">
        {/* 메인 컨텐츠 */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4 col-span-4 gap-5">
          {loaderData.jobs.map((job) => (
            <JobCard
              id={job.job_id}
              company={job.company_name}
              companyLogoUrl={job.company_logo}
              title={job.position}
              postedAt={job.created_at}
              type={job.job_type}
              positionLocation={job.location}
              salary={job.salary_range}
            />
          ))}
        </main>

        {/* 사이드바 */}
        <aside className="xl:col-span-2 flex flex-col gap-10 sticky top-20">
          <div className="flex flex-col items-start gap-2">
            <h4 className="text-sm text-muted-foreground font-bold">
              Type
            </h4>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((type) => (
                <Button
                  variant="outline"
                  key={type.value}
                  onClick={() => {
                    if (type.value === searchParams.get("type")) {
                      onFilterRemove("type");
                    } else {
                      onFilterClick("type", type.value);
                    }
                  }}
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
                  onClick={() =>
                    onFilterToggle("location", type.value)
                  }
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
                  onClick={() => onFilterToggle("salary", range)}
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
        </aside>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <h1 className="text-2xl font-bold">
          {error.data.error_code === "INVALID_SEARCH_PARAMS"
            ? "검색 조건 오류"
            : "오류가 발생했습니다"}
        </h1>
        <p className="text-muted-foreground">
          {error.data.error_message || "잠시 후 다시 시도해주세요."}
        </p>
        <Button asChild variant="outline">
          <Link to="/jobs">처음으로 돌아가기</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
      <h1 className="text-2xl font-bold">
        예상치 못한 오류가 발생했습니다
      </h1>
      <p className="text-muted-foreground">
        잠시 후 다시 시도해주세요.
      </p>
      <Button asChild variant="outline">
        <Link to="/jobs">처음으로 돌아가기</Link>
      </Button>
    </div>
  );
}
