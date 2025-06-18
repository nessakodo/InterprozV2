import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import JobCard from "@/components/JobCard";
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Star, 
  CheckCircle,
  Search,
  Filter,
  FileText,
  MessageSquare,
  Settings,
  TrendingUp
} from "lucide-react";

export default function InterpreterDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch dashboard data
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/interpreter/stats"],
  });

  const { data: jobs, isLoading: jobsLoading } = useQuery({
    queryKey: ["/api/interpreter/jobs"],
  });

  const { data: availableJobs, isLoading: availableLoading } = useQuery({
    queryKey: ["/api/interpreter/jobs/available"],
  });

  const { data: upcomingJobs, isLoading: upcomingLoading } = useQuery({
    queryKey: ["/api/interpreter/jobs/upcoming"],
  });

  const { data: earnings, isLoading: earningsLoading } = useQuery({
    queryKey: ["/api/interpreter/earnings"],
  });

  // Job management mutations
  const acceptJob = useMutation({
    mutationFn: async (jobId: number) => {
      return apiRequest("POST", `/api/interpreter/jobs/${jobId}/accept`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/interpreter/jobs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/interpreter/jobs/available"] });
      toast({
        title: "Job Accepted",
        description: "You have successfully accepted this interpretation job.",
      });
    },
  });

  const completeJob = useMutation({
    mutationFn: async (jobId: number) => {
      return apiRequest("PATCH", `/api/jobs/${jobId}`, {
        status: "completed",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/interpreter/jobs"] });
      toast({
        title: "Job Completed",
        description: "Job has been marked as completed.",
      });
    },
  });

  const updateAvailability = useMutation({
    mutationFn: async (availability: any) => {
      return apiRequest("POST", "/api/interpreter/availability", availability);
    },
    onSuccess: () => {
      toast({
        title: "Availability Updated",
        description: "Your availability has been successfully updated.",
      });
    },
  });

  const handleJobAction = (action: string, jobId: number) => {
    if (action === "accept") {
      acceptJob.mutate(jobId);
    } else if (action === "complete") {
      completeJob.mutate(jobId);
    } else if (action === "message") {
      // Navigate to messages
      console.log("Open messages for job:", jobId);
    }
  };

  const filteredJobs = jobs?.filter((job: any) =>
    job.language?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAvailableJobs = availableJobs?.filter((job: any) =>
    job.language?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (statsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Interpreter Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {user?.firstName || "Interpreter"}
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Availability
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Documents
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-interproz-blue" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Jobs Completed</p>
                    <p className="text-2xl font-bold">{stats?.completedJobs || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Hours Worked</p>
                    <p className="text-2xl font-bold">{stats?.totalHours || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold">
                      ${stats?.totalEarnings || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="text-2xl font-bold">
                      {stats?.averageRating || "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="available">Available Jobs</TabsTrigger>
              <TabsTrigger value="my-jobs">My Jobs</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {jobs?.slice(0, 5).map((job: any) => (
                        <div key={job.id} className="flex items-center justify-between border-b pb-3">
                          <div>
                            <p className="font-medium">{job.language} - {job.specialty}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(job.startTime).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={
                            job.status === "completed" ? "default" :
                            job.status === "confirmed" ? "secondary" :
                            job.status === "in_progress" ? "outline" : "destructive"
                          }>
                            {job.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-20 flex-col">
                        <CheckCircle className="h-6 w-6 mb-2" />
                        Available Jobs
                      </Button>
                      <Button variant="outline" className="h-20 flex-col">
                        <MessageSquare className="h-6 w-6 mb-2" />
                        Messages
                      </Button>
                      <Button variant="outline" className="h-20 flex-col">
                        <Settings className="h-6 w-6 mb-2" />
                        Availability
                      </Button>
                      <Button variant="outline" className="h-20 flex-col">
                        <TrendingUp className="h-6 w-6 mb-2" />
                        Earnings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-interproz-blue">
                        {stats?.monthlyJobs || 0}
                      </div>
                      <p className="text-sm text-gray-600">Jobs This Month</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">
                        ${stats?.monthlyEarnings || 0}
                      </div>
                      <p className="text-sm text-gray-600">Monthly Earnings</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">
                        {stats?.clientSatisfaction || 0}%
                      </div>
                      <p className="text-sm text-gray-600">Client Satisfaction</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="available" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Available Jobs</h2>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search jobs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-80"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              {availableLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : filteredAvailableJobs?.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      No Available Jobs
                    </h3>
                    <p className="text-gray-500">
                      There are currently no jobs available that match your qualifications.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredAvailableJobs?.map((job: any) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      userRole="interpreter"
                      onAction={handleJobAction}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="my-jobs" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">My Jobs</h2>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search my jobs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-80"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              {jobsLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredJobs?.map((job: any) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      userRole="interpreter"
                      onAction={handleJobAction}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Upcoming Assignments</h2>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendar View
                </Button>
              </div>

              {upcomingLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : upcomingJobs?.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      No Upcoming Assignments
                    </h3>
                    <p className="text-gray-500">
                      You don't have any upcoming interpretation assignments.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {upcomingJobs?.map((job: any) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      userRole="interpreter"
                      onAction={handleJobAction}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="earnings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Earnings & Payments</h2>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">This Month</p>
                      <p className="text-2xl font-bold">${stats?.monthlyEarnings || 0}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Total Earnings</p>
                      <p className="text-2xl font-bold">${stats?.totalEarnings || 0}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Hourly Rate</p>
                      <p className="text-2xl font-bold">${stats?.hourlyRate || 0}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {earningsLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Payments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {earnings?.map((payment: any) => (
                        <div key={payment.id} className="flex items-center justify-between border-b pb-3">
                          <div>
                            <p className="font-medium">
                              {payment.jobLanguage} - {payment.jobSpecialty}
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(payment.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${payment.amount}</p>
                            <Badge variant={
                              payment.status === "paid" ? "default" : "outline"
                            }>
                              {payment.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}