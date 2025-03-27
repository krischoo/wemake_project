import { Route } from "./+types/product-visit-page";
import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({
  params,
  request,
}: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const { data, error } = await client
    .from("products")
    .select("url")
    .eq("product_id", Number(params.productId));
  if (data) {
    await client.rpc("track_event", {
      event_type: "product_click",
      event_data: {
        product_id: params.productId,
      },
    });
    return redirect(data[0].url);
  }
  return null;
};
