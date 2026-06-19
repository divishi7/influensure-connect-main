import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Search, ShieldAlert, FileText, BarChart3, Users, Settings, Sparkles,
  ScrollText, Shield, Activity, Briefcase,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/ui-ext/logo";

const main = [
  { title: "Dashboard", url: "/app", icon: LayoutDashboard },
  { title: "Discover Influencers", url: "/app/discover", icon: Search },
  { title: "Fraud Detection", url: "/app/fraud", icon: ShieldAlert },
  { title: "Campaigns", url: "/app/campaigns", icon: Sparkles },
  { title: "Analytics", url: "/app/analytics", icon: BarChart3 },
  { title: "Reports", url: "/app/reports", icon: FileText },
  { title: "Settings", url: "/app/settings", icon: Settings },
];

const admin = [
  { title: "Users", url: "/app/admin/users", icon: Users },
  { title: "Influencers", url: "/app/admin/influencers", icon: Briefcase },
  { title: "Fraud Reports", url: "/app/admin/fraud-reports", icon: Shield },
  { title: "Campaign Monitor", url: "/app/admin/campaigns", icon: ScrollText },
  { title: "Platform Analytics", url: "/app/admin/analytics", icon: Activity },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (url: string) => (url === "/app" ? pathname === "/app" : pathname.startsWith(url));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-3">
        <Link to="/app" className="flex items-center gap-2 px-1">
          <Logo showText={!collapsed} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {main.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {admin.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3">
        {!collapsed && (
          <div className="glass rounded-xl p-3 text-xs">
            <p className="font-medium">Pro Plan</p>
            <p className="text-muted-foreground mt-0.5">12,482 creators indexed</p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}