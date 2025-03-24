import { ChevronUpIcon, StarIcon } from "lucide-react";
import { Route } from "./+types/product-overview-page";
import { Button } from "~/common/components/ui/button";
import { Link, useOutletContext } from "react-router";
import { browserClient } from "~/supa-client";

export const loader = async ({ params }: Route.LoaderArgs) => {
  await browserClient.rpc("track_event", {
    event_type: "product_view",
    event_data: {
      product_id: params.productId,
    },
  });
  return null;
};

export default function ProductOverviewPage() {
  const {
    product_id,
    description,
    how_it_works,
  }: {
    product_id: string;
    description: string;
    how_it_works: string;
  } = useOutletContext();

  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h3 className="text-2xl font-bold">어떤 제품인가요?</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-bold">어떻게 작동하나요?</h3>
        <p className="text-muted-foreground">{how_it_works}</p>
      </div>
    </div>
  );
}
