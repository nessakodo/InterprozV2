import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  DollarSign,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Search,
  Filter,
  BarChart3,
  PieChart,
  UserCheck,
  UserX,
  Settings
} from "lucide-react";

export default function AdminDashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  // Redirect to login if not authenticated or not admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      toast({
        title: "Unauthorized",
        description: "Admin access required. Redirecting...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, user, toast]);

  // Fetch analytics data
  const { data: jobStats, isLoading: jobStatsLoading, error: jobStatsError } = useQuery({
    queryKey: ["/api/analytics/jobs"],
    enabled: isAuthenticated && user?.role === "admin",
  });

  const { data: userStats, isLoading: userStatsLoading, error: userStatsError } = useQuery({
    queryKey: ["/api/analytics/users"],
    enabled: isAuthenticated && user?.role === "admin",
  });

  const { data: allJobs = [], isLoading: allJobsLoading } = useQuery({
    queryKey: ["/api/jobs"],
    enabled: isAuthenticated && user?.role === "admin",
  });

  // Handle errors
  useEffect(() => {
    const errors = [jobStatsError, userStatsError].filter(Boolean);
    if (errors.length > 0 && isUnauthorizedError(errors[0] as Error)) {
      toast({
        title: "Unauthorized",
        description: "Session expired. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [jobStatsError, userStatsError, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-interproz-blue border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  const platformStats = [
    { 
      title: "Total Users", 
      value: userStatsLoading ? "..." : userStats?.total || 0, 
      icon: Users, 
      color: "bg-blue-500",
      trend: "+12% this month"
    },
    { 
      title: "Active Jobs", 
      value: jobStatsLoading ? "..." : jobStats?.pending || 0, 
      icon: Briefcase, 
      color: "bg-green-500",
      trend: "+8% this week"
    },
    { 
      title: "Completed Jobs", 
      value: jobStatsLoading ? "..." : jobStats?.completed || 0, 
      icon: CheckCircle, 
      color: "bg-purple-500",
      trend: "+15% this month"
    },
    { 
      title: "Platform Revenue", 
      value: "$48,392", 
      icon: DollarSign, 
      color: "bg-yellow-500",
      trend: "+23% this month"
    }
  ];

  const recentJobs = allJobs.slice(0, 5);
  const systemAlerts = [
    { 
      type: "warning", 
      message: "High demand for Spanish interpreters in medical specialty", 
      time: "2 hours ago",
      icon: AlertCircle,
      color: "text-yellow-600"
    },
    { 
      type: "info", 
      message: "New interpreter certification batch completed", 
      time: "4 hours ago",
      icon: UserCheck,
      color: "text-blue-600"
    },
    { 
      type: "success", 
      message: "Platform uptime: 99.9% this month", 
      time: "6 hours ago",
      icon: Activity,
      color: "text-green-600"
    }
  ];

  const getJobStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "in_progress": return "bg-yellow-100 text-yellow-800";
      case "pending": return "bg-gray-100 text-gray-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Monitor platform performance and manage system operations</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                System Online
              </Badge>
              <Badge variant="outline">
                {userStats?.total || 0} Total Users
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Platform Stats */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {platformStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="outline" className="text-xs text-green-600">
                    {stat.trend}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Jobs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {allJobsLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="animate-spin w-6 h-6 border-2 border-interproz-blue border-t-transparent rounded-full" />
                        </div>
                      ) : recentJobs.length > 0 ? (
                        <div className="space-y-4">
                          {recentJobs.map((job: any) => (
                            <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex-1">
                                <div className="flex items-center space-x-4">
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      {job.language} - {job.specialty}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {new Date(job.startTime).toLocaleDateString()} • {job.modality}
                                    </p>
                                  </div>
                                  <Badge className={getJobStatusColor(job.status)}>
                                    {job.status}
                                  </Badge>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-gray-500 py-8">No recent jobs</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* System Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {systemAlerts.map((alert, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <alert.icon className={`w-5 h-5 mt-0.5 ${alert.color}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 font-medium">
                              {alert.message}
                            </p>
                            <p className="text-xs text-gray-500">{alert.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <Users className="w-6 h-6" />
                      <span>Manage Users</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <Briefcase className="w-6 h-6" />
                      <span>Review Jobs</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <BarChart3 className="w-6 h-6" />
                      <span>View Reports</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <Settings className="w-6 h-6" />
                      <span>System Settings</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>User Management</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-900">
                        {userStats?.clients || 0}
                      </div>
                      <p className="text-gray-600">Clients</p>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <UserCheck className="w-8 h-8 text-green-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-900">
                        {userStats?.interpreters || 0}
                      </div>
                      <p className="text-gray-600">Interpreters</p>
                    </div>
                    <div className="text-center p-6 bg-yellow-50 rounded-lg">
                      <Activity className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-900">
                        {Math.floor(((userStats?.clients || 0) + (userStats?.interpreters || 0)) * 0.85)}
                      </div>
                      <p className="text-gray-600">Active This Month</p>
                    </div>
                  </div>
                  
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">User Management Interface</h3>
                    <p className="text-gray-600 mb-4">Detailed user management functionality would be implemented here</p>
                    <Button variant="outline">View All Users</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jobs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Clock className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-900">
                        {jobStats?.pending || 0}
                      </div>
                      <p className="text-sm text-gray-600">Pending</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Activity className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-900">
                        {allJobs.filter((job: any) => job.status === "in_progress").length}
                      </div>
                      <p className="text-sm text-gray-600">In Progress</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-900">
                        {jobStats?.completed || 0}
                      </div>
                      <p className="text-sm text-gray-600">Completed</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <UserX className="w-6 h-6 text-red-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-900">
                        {allJobs.filter((job: any) => job.status === "cancelled").length}
                      </div>
                      <p className="text-sm text-gray-600">Cancelled</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {allJobsLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin w-6 h-6 border-2 border-interproz-blue border-t-transparent rounded-full" />
                      </div>
                    ) : allJobs.length > 0 ? (
                      allJobs.slice(0, 10).map((job: any) => (
                        <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-4">
                            <div>
                              <p className="font-medium text-gray-900">
                                Job #{job.id} - {job.language} {job.specialty}
                              </p>
                              <p className="text-sm text-gray-600">
                                {new Date(job.startTime).toLocaleDateString()} • {job.modality}
                                {job.interpreterId && ` • Interpreter assigned`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge className={getJobStatusColor(job.status)}>
                              {job.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              Manage
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No jobs found</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5" />
                      <span>Performance Metrics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Platform Utilization</span>
                          <span>87%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-interproz-blue h-2 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Client Satisfaction</span>
                          <span>94%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Interpreter Availability</span>
                          <span>76%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <PieChart className="w-5 h-5" />
                      <span>Service Distribution</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Video Remote (VRI)</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                          </div>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Phone (OPI)</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                          </div>
                          <span className="text-sm font-medium">35%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">On-Site</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                          </div>
                          <span className="text-sm font-medium">20%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-green-600">99.9%</div>
                      <p className="text-gray-600">Uptime</p>
                    </div>
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <Activity className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-blue-600">1.2s</div>
                      <p className="text-gray-600">Avg Response</p>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-lg">
                      <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-purple-600">248</div>
                      <p className="text-gray-600">Active Sessions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2">
                        Platform Name
                      </Label>
                      <Input value="Interproz" disabled />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2">
                        Support Email
                      </Label>
                      <Input value="support@interproz.com" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact
                      </Label>
                      <Input value="1-800-INTERPROZ" />
                    </div>
                    <Button className="bg-interproz-blue hover:bg-interproz-dark">
                      Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
