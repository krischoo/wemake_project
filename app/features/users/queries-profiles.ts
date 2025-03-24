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
        avatar
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
