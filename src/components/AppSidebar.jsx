import { BarChart3, FileText, FolderOpen, Settings, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function AppSidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      icon: BarChart3,
      id: "dashboard",
    },
    // {
    //   title: "Bids",
    //   icon: FolderOpen,
    //   id: "bids",
    // },
    {
      title: "Bids",
      icon: FileText,
      id: "bids",
    },
    {
      title: "Users",
      icon: Users,
      id: "users",
    },
    {
      title: "Settings",
      icon: Settings,
      id: "settings",
    },
  ];

  useEffect(() => {
    console.log("--");
  }, []);

  return (
    <div className="w-48 min-h-screen bg-amber-200">
      <Sidebar className="border-r bg-amber-200 w-48 border-gray-200 h-full">
        <SidebarHeader className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">BidManager</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <Link to={item.id}>
                      <SidebarMenuButton className="w-full justify-start">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
