import { data, Outlet } from "react-router";
import { z } from "zod";
import { Route } from "./+types/leaderboard-layout";

/* search parameter를 parse하는 schema */
const searchParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success: pageParseSuccess, data: pageParsedData } =
    searchParamsSchema.safeParse(
      Object.fromEntries(url.searchParams)
    );

  if (!pageParseSuccess) {
    throw data(
      {
        error_code: "INVALID_SEARCH_PARAMS",
        message: "Invalid search params",
      },
      { status: 400 }
    );
  }
};

export default function LeaderboardLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
