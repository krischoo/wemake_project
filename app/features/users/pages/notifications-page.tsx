import { makeSSRClient } from "~/supa-client";
import NotificationCard from "../components/notification-card";
import { Route } from "./+types/notifications-page";
import {
  countNotifications,
  getLoggedInUserId,
  getNotifications,
} from "../queries-profiles";
import { DateTime } from "luxon";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "알림 | writenow",
    },
  ];
};
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const notifications = await getNotifications(client, { userId });
  const count = await countNotifications(client, { userId });
  return { notifications, count };
};
export default function NotificationsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold">알림 {loaderData.count}</h1>
      <div className="flex flex-col items-start gap-5">
        {loaderData.notifications
          .filter((notification) => !notification.seen)
          .map((notification) => (
            <NotificationCard
              id={notification.notification_id}
              key={notification.notification_id}
              username={notification.source?.name ?? ""}
              type={
                notification.type as "follow" | "review" | "reply"
              }
              timestamp={
                DateTime.fromISO(
                  notification.created_at ?? ""
                ).toRelative()!
              }
              avatarUrl={notification.source?.avatar ?? ""}
              seen={notification.seen}
              payloadId={
                notification.product?.product_id ??
                notification.post?.post_id
              }
              productName={notification.product?.name ?? ""}
              postTitle={notification.post?.title ?? ""}
              notificationId={notification.notification_id}
            />
          ))}
      </div>
    </div>
  );
}
