import { makeSSRClient } from "~/supa-client";

export const checkUsernameExists = async (
  request: Request,
  username: string
) => {
  const { client } = makeSSRClient(request);
  const { data, error } = await client
    .from("profiles")
    .select("profile_id")
    .eq("username", username)
    .single();
  if (error) {
    return false; // 중복이 안되면 false (가입 가능)
  }
  return true; // 중복이 되면 true (가입 불가능)
};
