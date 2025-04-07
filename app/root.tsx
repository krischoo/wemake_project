import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
  Link,
} from "react-router";
import { Settings } from "luxon";
import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import Navigation from "./common/components/navigation";
import { useLocation } from "react-router";
import { cn } from "./lib/utils";
import { makeSSRClient } from "./supa-client";
import {
  countNotifications,
  getUserById,
} from "./features/users/queries-profiles";
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  Settings.defaultLocale = "ko";
  Settings.defaultZone = "Asia/Seoul";

  return (
    <html lang="en" className="">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <main>{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

//
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();

  if (user && user.id) {
    const profile = await getUserById(client, user.id);
    const count = await countNotifications(client, {
      userId: user.id,
    });
    return { user, profile, notificationsCount: count };
  }

  return { user: null, profile: null, notificationsCount: 0 };
};

export default function App({ loaderData }: Route.ComponentProps) {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const isLoggedIn = loaderData.user !== null;

  return (
    <div
      className={cn({
        "py-24 px-5 lg:px-20": !pathname.includes("/auth"),
        "transition-opacity animate-pulse": isLoading,
      })}
    >
      {pathname.includes("/auth") ? null : (
        <Navigation
          isLoggedIn={isLoggedIn}
          username={loaderData.profile?.username ?? null}
          avatar={loaderData.profile?.avatar ?? null}
          name={loaderData.profile?.name ?? null}
          hasNotifications={loaderData.notificationsCount > 0}
          hasMessages={false}
        />
      )}
      <Outlet
        context={{
          isLoggedIn,
          name: loaderData.profile?.name,
          username: loaderData.profile?.username,
          avatar: loaderData.profile?.avatar,
        }}
      />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "앗!";
  let details = "예상치 못한 오류가 발생했습니다.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message =
      error.status === 404
        ? "페이지를 찾을 수 없습니다"
        : "오류가 발생했습니다";
    details =
      error.status === 404
        ? "요청하신 페이지가 존재하지 않습니다. URL을 다시 확인해주세요."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{message}</h1>
        <p className="text-muted-foreground">{details}</p>
        {stack && (
          <pre className="mt-4 p-4 bg-muted rounded-lg overflow-x-auto text-sm">
            <code>{stack}</code>
          </pre>
        )}
        <div className="mt-8">
          <Link to="/" className="text-primary hover:underline">
            홈으로 돌아가기 &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
