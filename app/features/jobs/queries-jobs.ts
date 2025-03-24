import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "~/supa-client";
import {
  JOB_TYPES,
  SALARY_RANGE,
  LOCATION_TYPES,
} from "./constants-jobs";

export const getJobs = async (
  client: SupabaseClient<Database>,
  {
    limit,
    location,
    type,
    salary,
  }: {
    limit: number;
    location?: (typeof LOCATION_TYPES)[number]["value"];
    type?: (typeof JOB_TYPES)[number]["value"];
    salary?: (typeof SALARY_RANGE)[number];
  }
) => {
  const baseQuery = client
    .from("jobs")
    .select(
      "job_id, position, company_name, company_logo,  job_type, location, salary_range, created_at"
    )
    .limit(limit);

  // 위치 필터 적용
  if (location) {
    baseQuery.eq("location", location);
  }

  // 직무 타입 필터 적용
  if (type) {
    baseQuery.eq("job_type", type);
  }

  // 급여 범위 필터 적용
  if (salary) {
    baseQuery.eq("salary_range", salary);
  }

  const { data, error } = await baseQuery;
  if (error) throw error;

  return data;
};

export const getJobById = async (
  client: SupabaseClient<Database>,
  jobId: number
) => {
  const { data, error } = await client
    .from("jobs")
    .select(
      `
      job_id,
      position,
      overview,
      responsibilities,
      qualifications,
      skills,
      company_name,
      company_logo,
      apply_url,
      job_type,
      location,
      salary_range,
      created_at,
      updated_at
      `
    )
    .eq("job_id", jobId)
    .single();
  if (error) throw error;
  return data;
};
