import { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "react-router";
import { Database } from "~/supa-client";

export const getUserProfile = async (
  client: SupabaseClient<Database>,
  username: string
) => {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
        profile_id,
        name,
        username,
        avatar,
        role,
        headline,
        bio
        `
    )
    .eq("username", username)
    .single();
  if (error) throw error;
  return data;
};

export const getUserById = async (
  client: SupabaseClient<Database>,
  profile_id: string
) => {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
        profile_id,
        name,
        username,
        avatar,
        headline,
        bio,
        role
        `
    )
    .eq("profile_id", profile_id)
    .single();
  if (error) throw error;
  return data;
};

export const getUserProducts = async (
  client: SupabaseClient<Database>,
  username: string
) => {
  const { data, error } = await client
    .from("products")
    .select(
      `
        product_id,
        name,
        tagline,
        upvotes:stats->>upvotes,
        views:stats->>views,
        reviews:stats->>reviews,
        profiles!products_to_profiles!inner(profile_id)
        `
    )
    .eq("profiles.username", username);
  if (error) throw error;
  return data;
};

export const getUserPosts = async (
  client: SupabaseClient<Database>,
  username: string
) => {
  const { data, error } = await client
    .from("community_post_list_view")
    .select("*")
    .eq("author_username", username);
  if (error) throw error;
  return data;
};

export const getLoggedInUserId = async (
  client: SupabaseClient<Database>
) => {
  const { data, error } = await client.auth.getUser();
  if (error || data.user === null) {
    throw redirect("/auth/login");
  }
  return data.user.id;
};

export const getProductsByUserId = async (
  client: SupabaseClient<Database>,
  userId: string
) => {
  const { data, error } = await client
    .from("products")
    .select(
      `
        product_id,
        name
        `
    )
    .eq("profile_id", userId);
  if (error) throw error;
  return data;
};

/** 유저 이름 중복 체크 **/
export const checkUsernameAvailability = async (
  client: SupabaseClient<Database>,
  username: string,
  currentUserId: string
) => {
  const { data, error } = await client
    .from("profiles")
    .select("profile_id")
    .eq("username", username)
    .neq("profile_id", currentUserId) // 현재의 Id는 해당되지 않음
    .maybeSingle();

  if (error) throw error;
  return !data; // 데이터가 없으면 사용 가능
};

export const getNotifications = async (
  client: SupabaseClient<Database>,
  { userId }: { userId: string }
) => {
  const { data, error } = await client
    .from("notifications")
    .select(
      `
        notification_id,
        type,
        source:profiles!source_id(
          profile_id,
          name,
          avatar
        ),
        product:products!product_id(
          product_id,
          name
        ),
        post:posts!post_id(
          post_id,
          title
        ),
        seen,
        created_at
      `
    )
    .eq("target_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;

  return data;
};

export const countNotifications = async (
  client: SupabaseClient<Database>,
  { userId }: { userId: string }
) => {
  const { count, error } = await client
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("target_id", userId)
    .eq("seen", false);
  if (error) throw error;

  return count ?? 0;
};
