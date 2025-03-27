import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "~/supa-client";

export const claimIdea = async (
  client: SupabaseClient<Database>,
  ideaId: number,
  userId: string
) => {
  const { error } = await client
    .from("gpt_ideas")
    .update({
      claimed_at: new Date().toISOString(),
      claimed_by: userId,
    })
    .eq("gpt_idea_id", ideaId)
    .select()
    .single();

  if (error) throw error;
};
