import { Link, Outlet } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarProvider,
  SidebarGroup,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenuItem,
} from "~/common/components/ui/sidebar";
import {
  HomeIcon,
  PackageIcon,
  RocketIcon,
  SparkleIcon,
} from "lucide-react";
import { useLocation } from "react-router";
import { makeSSRClient } from "~/supa-client";
import { Route } from "./+types/dashboard-layout";
import {
  getLoggedInUserId,
  getProductsByUserId,
} from "../queries-profiles";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const products = await getProductsByUserId(client, userId);
  return { products, userId };
};
export default function DashboardLayout({
  loaderData,
}: Route.ComponentProps) {
  const location = useLocation();
  return (
    <SidebarProvider className="max-h-[calc(100vh-12rem)] h-[calc(100vh-12rem)] overflow-hidden  min-h-full">
      <Sidebar variant="floating" className="pt-16">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {/* Home */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/my/dashboard"}
                >
                  <Link to="/my/dashboard">
                    <HomeIcon className="w-4 h-4 mr-2" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Ideas */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={
                    location.pathname === "/my/dashboard/ideas"
                  }
                >
                  <Link to="/my/dashboard/ideas">
                    <SparkleIcon className="w-4 h-4 mr-2" />
                    <span>Ideas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          {/* 모든 제품에 대한 통계 */}
          <SidebarGroup>
            <SidebarGroupLabel>
              <span>제품 분석 통계</span>
            </SidebarGroupLabel>

            {/* 제품- */}
            <SidebarMenu>
              {loaderData.products.map((product) => (
                <SidebarMenuItem key={product.product_id}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={`/my/dashboard/products/${product.product_id}`}
                    >
                      <RocketIcon className="w-4 h-4 mr-2" />
                      <span>{product.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="h-full w-full overflow-y-auto">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
