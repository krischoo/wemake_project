import {
  AnyPgColumn,
  bigint,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { profiles } from "../users/schema-profiles";

export const topics = pgTable("topics", {
  topic_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  name: text().notNull(),
  slug: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  post_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity()
    .notNull(),
  title: text().notNull(),
  content: text().notNull(),
  upvotes: bigint({ mode: "number" }).default(0),
  topic_id: bigint({ mode: "number" })
    .notNull()
    .references(() => topics.topic_id),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
  profile_id: uuid()
    .notNull()
    .references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
});

export const postUpvotes = pgTable(
  "post_upvotes",
  {
    post_id: bigint({ mode: "number" }).references(
      () => posts.post_id
    ),
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
  },
  (table) => [
    primaryKey({ columns: [table.post_id, table.profile_id] }),
  ]
);

export const postReplies = pgTable("post_replies", {
  reply_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  post_id: bigint({ mode: "number" }).references(() => posts.post_id),
  parent_id: bigint({ mode: "number" }).references(
    (): AnyPgColumn => postReplies.reply_id
  ),
  profile_id: uuid()
    .notNull()
    .references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
  reply: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
