import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Calendar, 
  Clock, 
  DollarSign,
  MessageSquare,
  Star,
  TrendingUp,
  CheckCircle,
  Award,
  Users
} from "lucide-react";

export default function InterpreterDashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  // Fetch interpreter jobs
  const { data: jobs = [], isLoading: jobsLoading, error: jobsError } = useQuery({
    queryKey: ["/api/jobs"],
    enabled: isAuthenticated && user?.role === "interpreter",
  });

  // Fetch available jobs
  const { data: availableJobs = [], isLoading: availableJobsLoading } = useQuery({
    queryKey: ["/api/jobs/available"],
    enabled: isAuthenticated && user?.role === "interpreter",
  });

  // Claim job mutation
  const claimJobMutation = useMutation({
    mutationFn: async (jobId: number) => {
      const response = await apiRequest("POST", `/api/jobs/${jobId}/claim`, {});
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Job Claimed",
        description: "The job has been assigned to you successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/jobs/available"] });
    },
    onError: (error: any) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message || "Failed to claim job.",
        variant: "destructive",
      });
    }
  });

  // Handle error
  useEffect(() => {
    if (jobsError && isUnauthorizedError(jobsError as Error)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [jobsError, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-interproz-blue border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "interpreter") {
    return null;
  }

  const handleClaimJob = (jobId: number) => {
    claimJobMutation.mutate(jobId);
  };

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

  const myJobs = jobs.filter((job: any) => job.interpreterId === user.id);
  const jobStats = {
    total: myJobs.length,
    upcoming: myJobs.filter((job: any) => job.status === "confirmed" || job.status === "in_progress").length,
    completed: myJobs.filter((job: any) => job.status === "completed").length,
    earnings: myJobs.filter((job: any) => job.status === "completed").reduce((sum: number, job: any) => sum + (parseFloat(job.totalAmount) || 0), 0),
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
              <h1 className="text-3xl font-bold text-gray-900">Interpreter Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.firstName || "Interpreter"}! Manage your interpretation sessions.</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Active Interpreter
              </Badge>
              {user?.rating && (
                <Badge variant="outline" className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-current text-yellow-500" />
                  <span>{user.rating}</span>
                </Badge>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {[
            { title: "Total Jobs", value: jobStats.total, icon: Briefcase, color: "bg-blue-500" },
            { title: "Upcoming", value: jobStats.upcoming, icon: Calendar, color: "bg-green-500" },
            { title: "Completed", value: jobStats.completed, icon: CheckCircle, color: "bg-purple-500" },
            { title: "Earnings", value: `$${jobStats.earnings.toFixed(2)}`, icon: DollarSign, color: "bg-yellow-500" }
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
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
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="available">Available Jobs</TabsTrigger>
              <TabsTrigger value="my-jobs">My Jobs</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {jobsLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin w-6 h-6 border-2 border-interproz-blue border-t-transparent rounded-full" />
                      </div>
                    ) : myJobs.slice(0, 3).length > 0 ? (
                      <div className="space-y-4">
                        {myJobs.slice(0, 3).map((job: any) => (
                          <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">{job.language} - {job.specialty}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(job.startTime).toLocaleDateString()} at {new Date(job.startTime).toLocaleTimeString()}
                              </p>
                            </div>
                            <Badge className={getJobStatusColor(job.status)}>
                              {job.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500 py-8">No jobs yet. Check available jobs to get started!</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("available")}
                    >
                      <Briefcase className="w-4 h-4 mr-2" />
                      Browse Available Jobs
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("my-jobs")}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      View My Schedule
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("performance")}
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Check Performance
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Update Availability
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="available" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  {availableJobsLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin w-6 h-6 border-2 border-interproz-blue border-t-transparent rounded-full" />
                    </div>
                  ) : availableJobs.length > 0 ? (
                    <div className="space-y-4">
                      {availableJobs.map((job: any) => (
                        <div key={job.id} className="border rounded-lg p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-4 mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {job.language} - {job.specialty}
                                </h3>
                                <Badge variant="outline">{job.modality}</Badge>
                              </div>
                              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                                <div className="flex items-center space-x-2">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(job.startTime).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4" />
                                  <span>{new Date(job.startTime).toLocaleTimeString()}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <DollarSign className="w-4 h-4" />
                                  <span>{job.rate ? `$${job.rate}/hr` : 'Rate TBD'}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Users className="w-4 h-4" />
                                  <span>{job.estimatedDuration} minutes</span>
                                </div>
                              </div>
                              {job.notes && (
                                <p className="text-sm text-gray-600 mb-4">
                                  <strong>Notes:</strong> {job.notes}
                                </p>
                              )}
                            </div>
                            <Button 
                              className="bg-interproz-blue hover:bg-interproz-dark"
                              onClick={() => handleClaimJob(job.id)}
                              disabled={claimJobMutation.isPending}
                            >
                              {claimJobMutation.isPending ? "Claiming..." : "Claim Job"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No available jobs</h3>
                      <p className="text-gray-600">Check back later for new opportunities.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="my-jobs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  {jobsLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin w-6 h-6 border-2 border-interproz-blue border-t-transparent rounded-full" />
                    </div>
                  ) : myJobs.length > 0 ? (
                    <div className="space-y-4">
                      {myJobs.map((job: any) => (
                        <JobCard key={job.id} job={job} userRole="interpreter" />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs assigned</h3>
                      <p className="text-gray-600 mb-4">Browse available jobs to start earning.</p>
                      <Button 
                        className="bg-interproz-blue hover:bg-interproz-dark"
                        onClick={() => setActiveTab("available")}
                      >
                        View Available Jobs
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule & Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Schedule Management</h3>
                    <p className="text-gray-600 mb-4">Calendar integration coming soon.</p>
                    <Button variant="outline" disabled>
                      Update Availability
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Performance & Ratings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {user?.rating || "N/A"}
                      </div>
                      <p className="text-gray-600">Overall Rating</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {jobStats.completed}
                      </div>
                      <p className="text-gray-600">Completed Jobs</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {jobStats.completed > 0 ? "100%" : "N/A"}
                      </div>
                      <p className="text-gray-600">Completion Rate</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Recent Feedback</h4>
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No feedback available yet.</p>
                    </div>
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
