import {
  pgTable,
  bigint,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  primaryKey,
  pgPolicy,
} from "drizzle-orm/pg-core";
import { profiles } from "../users/schema-profiles";
import { sql } from "drizzle-orm";

export const gptIdeas = pgTable(
  "gpt_ideas",
  {
    gpt_idea_id: bigint({ mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    idea: text().notNull(),
    views: integer().notNull().default(0),
    claimed_at: timestamp(),
    claimed_by: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("ideas_select_policy", {
      for: "select",
      using: sql`true`, // 모든 사용자가 조회 가능
    }),
    pgPolicy("ideas_update_policy", {
      for: "update",
      using: sql`auth.uid() = ${table.claimed_by}`, // 자신이 claim한 아이디어만 수정 가능
    }),
  ]
);

export const gptIdeasLikes = pgTable(
  "gpt_ideas_likes",
  {
    gpt_idea_id: bigint({ mode: "number" }).references(
      () => gptIdeas.gpt_idea_id,
      { onDelete: "cascade" }
    ),
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
  },
  (table) => [
    primaryKey({ columns: [table.gpt_idea_id, table.profile_id] }),
  ]
);
