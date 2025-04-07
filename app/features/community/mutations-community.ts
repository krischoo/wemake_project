import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "database.types";

export const createPost = async (
  client: SupabaseClient<Database>,
  {
    title,
    content,
    category,
    userId,
  }: {
    title: string;
    content: string;
    category: string;
    userId: string;
  }
) => {
  const { data: categoryData, error: categoryError } = await client
    .from("topics")
    .select("topic_id")
    .eq("slug", category)
    .single();
  if (categoryError) throw categoryError;

  const { data, error } = await client
    .from("posts")
    .insert({
      title,
      content,
      profile_id: userId,
      topic_id: categoryData.topic_id, // Foreign Key
    })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const createReply = async (
  client: SupabaseClient<Database>,
  {
    postId,
    reply,
    userId,
    parentId,
  }: {
    postId: number;
    reply: string;
    userId: string;
    parentId?: number;
  }
) => {
  const { error } = await client.from("post_replies").insert({
    ...(parentId && { parent_id: parentId }),
    reply,
    post_id: postId,
    profile_id: userId,
  });

  if (error) throw error;
};

export const toggleUpvote = async (
  client: SupabaseClient<Database>,
  { postId, userId }: { postId: number; userId: string }
) => {
  const { count, data } = await client
    .from("post_upvotes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId)
    .eq("profile_id", userId);

  if (count === 0) {
    await client.from("post_upvotes").insert({
      post_id: postId,
      profile_id: userId,
    });
  } else {
    await client
      .from("post_upvotes")
      .delete()
      .eq("post_id", postId)
      .eq("profile_id", userId);
  }
};
