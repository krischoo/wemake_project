import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "~/supa-client";
import { z } from "zod";
import { formSchema } from "./pages/submit-job-page";
import {
  JOB_TYPES,
  LOCATION_TYPES,
  SALARY_RANGE,
} from "./constants-jobs";

export const createJob = async (
  client: SupabaseClient<Database>,
  formData: z.infer<typeof formSchema>
) => {
  const { data, error } = await client
    .from("jobs")
    .insert([
      {
        position: formData.position,
        overview: formData.overview,
        responsibilities: formData.responsibilities,
        qualifications: formData.qualifications,
        skills: formData.skills,
        company_name: formData.companyName,
        company_logo: formData.companyLogoUrl,
        apply_url: formData.applyUrl,
        job_type:
          formData.jobType as Database["public"]["Enums"]["job_type"],
        location:
          formData.jobLocation as Database["public"]["Enums"]["location_type"],
        salary_range: formData.salaryRange,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
