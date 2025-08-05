import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Clock
} from "lucide-react";

export default function AdminAnalytics() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/admin/stats");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-interproz-blue"></div>
        </div>
      </DashboardLayout>
    );
  }

  const metrics = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Jobs",
      value: stats?.activeJobs || 0,
      change: "+8%",
      trend: "up",
      icon: Briefcase,
      color: "text-green-600"
    },
    {
      title: "Monthly Revenue",
      value: `$${stats?.monthlyRevenue || 0}`,
      change: "+15%",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-600"
    },
    {
      title: "Growth Rate",
      value: `${stats?.growthRate || 0}%`,
      change: "-2%",
      trend: "down",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center space-x-3">
          <BarChart3 className="h-8 w-8 text-interproz-blue" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Platform performance and insights</p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
            
            return (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      </div>
                      <div className={`p-3 rounded-full bg-gray-100 ${metric.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <TrendIcon className={`h-4 w-4 mr-1 ${
                        metric.trend === "up" ? "text-green-500" : "text-red-500"
                      }`} />
                      <span className={`text-sm font-medium ${
                        metric.trend === "up" ? "text-green-500" : "text-red-500"
                      }`}>
                        {metric.change}
                      </span>
                      <span className="text-sm text-gray-600 ml-1">from last month</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Charts and Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentActivity?.map((activity: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-interproz-blue rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                )) || [
                  { message: "New user registered", time: "2 minutes ago" },
                  { message: "Job completed successfully", time: "15 minutes ago" },
                  { message: "Payment processed", time: "1 hour ago" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-interproz-blue rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Job Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Job Status Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { status: "Completed", count: 45, color: "bg-green-500" },
                  { status: "In Progress", count: 12, color: "bg-blue-500" },
                  { status: "Pending", count: 8, color: "bg-yellow-500" },
                  { status: "Cancelled", count: 3, color: "bg-red-500" }
                ].map((item) => (
                  <div key={item.status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm font-medium">{item.status}</span>
                    </div>
                    <span className="text-sm text-gray-600">{item.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Monthly Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-interproz-blue">87%</p>
                <p className="text-sm text-gray-600">Job Completion Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">4.8/5</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">24hr</p>
                <p className="text-sm text-gray-600">Avg Response Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}