import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "~/supa-client";

export const getTeams = async (
  client: SupabaseClient<Database>,
  { limit }: { limit: number }
) => {
  const { data, error } = await client
    .from("teams")
    .select(
      `
        team_id,
        roles,
        product_description,
        team_leader_id:profiles!inner(
          name,
          avatar
        )
      `
    )
    .limit(limit);
  if (error) throw error;
  return data;
};

export const getTeamById = async (
  client: SupabaseClient<Database>,
  teamId: number
) => {
  const { data, error } = await client
    .from("teams")
    .select(
      `
      *,
      team_leader:profiles!inner(
        name,
        avatar,
        role
      )
      `
    )
    .eq("team_id", teamId)
    .single();
  if (error) throw error;
  return data;
};
