ALTER TABLE "gpt_ideas" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "ideas_select_policy" ON "gpt_ideas" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "ideas_update_policy" ON "gpt_ideas" AS PERMISSIVE FOR UPDATE TO public USING (auth.uid() = "gpt_ideas"."claimed_by");