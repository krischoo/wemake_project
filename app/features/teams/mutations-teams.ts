import { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { Database } from "~/supa-client";
import { formSchema } from "./pages/submit-team-page";

export const createTeam = async (
  client: SupabaseClient<Database>,
  userId: string,
  formData: z.infer<typeof formSchema>
) => {
  const { data, error } = await client
    .from("teams")
    .insert({
      team_leader_id: userId,
      product_name: formData.product,
      product_stage:
        formData.stage as Database["public"]["Enums"]["product_stage"],
      team_size: formData.size,
      equity_split: formData.share,
      roles: formData.members,
      product_description: formData.description,
    })
    .select("team_id")
    .single();
  if (error) throw error;
  return data;
};
