import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "~/supa-client";

export const updateUser = async (
  client: SupabaseClient<Database>,
  {
    id,
    name,
    role,
    headline,
    bio,
    username,
  }: {
    id: string;
    name: string;
    role:
      | "독서 리뷰"
      | "창작 글쓰기"
      | "시/에세이"
      | "전문 글쓰기"
      | "독서 토론";
    headline: string;
    username: string;
    bio: string;
  }
) => {
  const { error } = await client
    .from("profiles")
    .update({ name, role, headline, bio, username })
    .eq("profile_id", id);

  if (error) {
    throw error;
  }
};

export const updateUserAvatar = async (
  client: SupabaseClient<Database>,
  {
    id,
    avatarUrl,
  }: {
    id: string;
    avatarUrl: string;
  }
) => {
  const { error } = await client
    .from("profiles")
    .update({ avatar: avatarUrl })
    .eq("profile_id", id);

  if (error) {
    throw error;
  }
};

export const seeNotification = async (
  client: SupabaseClient<Database>,
  {
    notificationId,
    userId,
  }: {
    notificationId: string;
    userId: string;
  }
) => {
  const { error } = await client
    .from("notifications")
    .update({ seen: true })
    .eq("notification_id", Number(notificationId))
    .eq("target_id", userId);

  if (error) {
    throw error;
  }
};
