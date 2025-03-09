import {
	bigint,
	boolean,
	jsonb,
	pgEnum,
	pgSchema,
	pgTable,
	primaryKey,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { products } from "../products/schema-products";
import { posts } from "../community/schema-community";

/** user 테이블 (추후 삭제) **/
export const users = pgSchema("auth").table("users", {
	id: uuid("id").primaryKey(),
});

export const roles = pgEnum("role", [
	"독서 리뷰",
	"창작 글쓰기",
	"시/에세이",
	"전문 글쓰기",
	"독서 토론",
]);

export const profiles = pgTable("profiles", {
	profile_id: uuid("profile_id")
		.primaryKey()
		.references(() => users.id, { onDelete: "cascade" }),
	avatar: text(),
	name: text().notNull(),
	username: text().notNull().unique(),
	headline: text(),
	bio: text(),
	role: roles().default("독서 리뷰").notNull(),
	stats: jsonb("stats").$type<{
		followers: number;
		following: number;
	}>(),
	views: jsonb(),
	created_at: timestamp("created_at").defaultNow(),
	updated_at: timestamp("updated_at").defaultNow(),
});

/* 연결 테이블 */
export const follows = pgTable("follows", {
	follower_id: uuid("follower_id").references(() => profiles.profile_id, {
		onDelete: "cascade",
	}),
	following_id: uuid("following_id").references(() => profiles.profile_id, {
		onDelete: "cascade",
	}),
	created_at: timestamp().notNull().defaultNow(),
});

/** 4.8 **/

export const notificationType = pgEnum("notification_type", [
	"follow",
	"review",
	"reply",
	"mention",
]);
export const notifications = pgTable("notifications", {
	notification_id: bigint({ mode: "number" })
		.primaryKey()
		.generatedAlwaysAsIdentity(),

	source_id: uuid().references(() => profiles.profile_id, {
		onDelete: "cascade",
	}),
	product_id: bigint("product_id", { mode: "number" }).references(
		() => products.product_id,
		{
			onDelete: "cascade",
		}
	),
	post_id: bigint("post_id", { mode: "number" }).references(
		() => posts.post_id,
		{
			onDelete: "cascade",
		}
	),
	target_id: uuid()
		.references(() => profiles.profile_id, {
			onDelete: "cascade",
		})
		.notNull(),
	type: notificationType().notNull(),
	created_at: timestamp("created_at").defaultNow(),
});

/******************************************/

export const messageRooms = pgTable("message_rooms", {
	message_room_id: bigint({ mode: "number" })
		.primaryKey()
		.generatedAlwaysAsIdentity(),

	created_at: timestamp().notNull().defaultNow(),
});

/* 연결 테이블 */
export const messageRoomMembers = pgTable(
	"message_room_members",
	{
		message_room_id: bigint({ mode: "number" }).references(
			() => messageRooms.message_room_id,
			{
				onDelete: "cascade",
			}
		),
		profile_id: uuid().references(() => profiles.profile_id, {
			onDelete: "cascade",
		}),
	},
	(table) => [
		primaryKey({ columns: [table.message_room_id, table.profile_id] }),
	]
);

export const messages = pgTable("messages", {
	message_id: bigint({ mode: "number" })
		.primaryKey()
		.generatedAlwaysAsIdentity(),
	message_room_id: bigint({ mode: "number" }).references(
		() => messageRooms.message_room_id,
		{
			onDelete: "cascade",
		}
	),
	sender_id: uuid().references(() => profiles.profile_id, {
		onDelete: "cascade",
	}),
	content: text().notNull(),
	created_at: timestamp("created_at").defaultNow(),
});
