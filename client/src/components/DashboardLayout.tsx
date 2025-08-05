import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { useRealTimeSync } from "@/hooks/useRealTimeSync";
import { useNotifications } from "@/hooks/useNotifications";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Calendar, 
  Settings, 
  Bell,
  User,
  DollarSign,
  BarChart3,
  MessageSquare,
  Clock,
  Star,
  Menu,
  X
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Initialize real-time sync and notifications
  useRealTimeSync();
  const { notifications, unreadCount, markAsRead } = useNotifications();

  if (!user) return null;

  const getNavigation = () => {
    const basePath = `/dashboard/${user.role}`;
    
    const common = [
      { name: "Dashboard", href: basePath, icon: LayoutDashboard },
      { name: "Calendar", href: `${basePath}/calendar`, icon: Calendar },
      { name: "Messages", href: `${basePath}/messages`, icon: MessageSquare },
      { name: "Settings", href: `${basePath}/settings`, icon: Settings },
    ];

    switch (user.role) {
      case "admin":
        return [
          { name: "Dashboard", href: basePath, icon: LayoutDashboard },
          { name: "Users", href: `${basePath}/users`, icon: Users },
          { name: "Jobs", href: `${basePath}/jobs`, icon: Briefcase },
          { name: "Analytics", href: `${basePath}/analytics`, icon: BarChart3 },
          { name: "Calendar", href: `${basePath}/calendar`, icon: Calendar },
          { name: "Messages", href: `${basePath}/messages`, icon: MessageSquare },
          { name: "Settings", href: `${basePath}/settings`, icon: Settings },
        ];
      
      case "client":
        return [
          { name: "Dashboard", href: basePath, icon: LayoutDashboard },
          { name: "Bookings", href: `${basePath}/bookings`, icon: Briefcase },
          { name: "Calendar", href: `${basePath}/calendar`, icon: Calendar },
          { name: "Invoices", href: `${basePath}/invoices`, icon: DollarSign },
          { name: "Messages", href: `${basePath}/messages`, icon: MessageSquare },
          { name: "Settings", href: `${basePath}/settings`, icon: Settings },
          { name: "AI Avatar", href: "/avatar", icon: User },
        ];
      
      case "interpreter":
        return [
          { name: "Dashboard", href: basePath, icon: LayoutDashboard },
          { name: "Available Jobs", href: `${basePath}/available`, icon: Briefcase },
          { name: "Assignments", href: `${basePath}/assignments`, icon: Clock },
          { name: "Calendar", href: `${basePath}/calendar`, icon: Calendar },
          { name: "Messages", href: `${basePath}/messages`, icon: MessageSquare },
          { name: "Settings", href: `${basePath}/settings`, icon: Settings },
        ];
      
      default:
        return common;
    }
  };

  const navigation = getNavigation();

  const Sidebar = ({ mobile = false }) => (
    <div className={`${mobile ? 'lg:hidden' : 'hidden lg:flex'} flex-col w-64 bg-white border-r border-gray-200 ${mobile ? 'fixed inset-y-0 left-0 z-50' : ''}`}>
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-interproz-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {user.firstName?.[0] ?? user.username[0].toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{user.firstName ?? user.username}</h3>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
        {mobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                  isActive
                    ? "bg-interproz-blue text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => mobile && setSidebarOpen(false)}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:text-gray-900"
          onClick={() => logoutMutation.mutate()}
        >
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-600 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                {navigation.find(item => item.href === location)?.name || "Dashboard"}
              </h1>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </Button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-interproz-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user.firstName?.[0] ?? user.username[0].toUpperCase()}
                  </span>
                </div>
                <span className="hidden sm:inline text-sm font-medium text-gray-700">
                  {user.firstName ?? user.username}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}