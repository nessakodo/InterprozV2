import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import BookingForm from "@/components/BookingForm";
import JobCard from "@/components/JobCard";
import DashboardLayout from "@/components/DashboardLayout";
import CalendarComponent from "@/components/Calendar";
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Star, 
  Plus,
  Search,
  Filter,
  FileText,
  MessageSquare
} from "lucide-react";

export default function ClientDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Fetch dashboard data
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/client/stats"],
  });

  const { data: jobs, isLoading: jobsLoading } = useQuery({
    queryKey: ["/api/client/jobs"],
  });

  const { data: upcomingJobs, isLoading: upcomingLoading } = useQuery({
    queryKey: ["/api/client/jobs/upcoming"],
  });

  const { data: invoices, isLoading: invoicesLoading } = useQuery({
    queryKey: ["/api/client/invoices"],
  });

  // Job management mutations
  const cancelJob = useMutation({
    mutationFn: async (jobId: number) => {
      return apiRequest("PATCH", `/api/jobs/${jobId}`, {
        status: "cancelled",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/client/jobs"] });
      toast({
        title: "Job Cancelled",
        description: "Your interpretation job has been cancelled.",
      });
    },
  });

  const handleJobAction = (action: string, jobId: number) => {
    if (action === "cancel") {
      cancelJob.mutate(jobId);
    } else if (action === "reschedule") {
      // This would open a reschedule dialog
      console.log("Open reschedule dialog for job:", jobId);
    } else if (action === "message") {
      // Navigate to messages
      console.log("Open messages for job:", jobId);
    }
  };

  const filteredJobs = jobs?.filter((job: any) =>
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
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Client Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {user?.firstName || "Client"}
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Documents
              </Button>
              <Button 
                size="sm"
                onClick={() => setShowBookingForm(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Book Service
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
                    <p className="text-sm text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold">{stats?.totalBookings || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Hours Booked</p>
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
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold">
                      ${stats?.totalSpent || 0}
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
                    <p className="text-sm text-gray-600">Avg Rating</p>
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
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
                            job.status === "pending" ? "outline" : "destructive"
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
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col"
                        onClick={() => setShowBookingForm(true)}
                      >
                        <Plus className="h-6 w-6 mb-2" />
                        New Booking
                      </Button>
                      <Button variant="outline" className="h-20 flex-col">
                        <MessageSquare className="h-6 w-6 mb-2" />
                        Messages
                      </Button>
                      <Button variant="outline" className="h-20 flex-col">
                        <FileText className="h-6 w-6 mb-2" />
                        Documents
                      </Button>
                      <Button variant="outline" className="h-20 flex-col">
                        <Star className="h-6 w-6 mb-2" />
                        Rate Services
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Calendar Section */}
              <div className="mt-6">
                <CalendarComponent 
                  compact={true}
                  events={jobs?.map((job: any) => ({
                    id: job.id,
                    title: `${job.language} - ${job.serviceType}`,
                    date: new Date(job.scheduledDate || job.createdAt),
                    time: job.scheduledTime || "TBD",
                    type: 'job' as const,
                    status: job.status
                  })) || []}
                  onEventClick={(event) => {
                    // Navigate to job details or show modal
                    console.log('Event clicked:', event);
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">My Bookings</h2>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search bookings..."
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
                      userRole="client"
                      onAction={handleJobAction}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Upcoming Services</h2>
                <Button 
                  onClick={() => setShowBookingForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Book New Service
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
                      No Upcoming Services
                    </h3>
                    <p className="text-gray-500 mb-6">
                      You don't have any upcoming interpretation services scheduled.
                    </p>
                    <Button onClick={() => setShowBookingForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Book Your First Service
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {upcomingJobs?.map((job: any) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      userRole="client"
                      onAction={handleJobAction}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="invoices" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Invoices & Billing</h2>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>

              {invoicesLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {invoices?.map((invoice: any) => (
                    <Card key={invoice.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-interproz-light rounded-full flex items-center justify-center">
                              <FileText className="h-6 w-6 text-interproz-blue" />
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                Invoice #{invoice.number}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {new Date(invoice.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">${invoice.amount}</p>
                            <Badge variant={
                              invoice.status === "paid" ? "default" :
                              invoice.status === "pending" ? "outline" : "destructive"
                            }>
                              {invoice.status}
                            </Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Book Interpretation Service</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBookingForm(false)}
                >
                  ×
                </Button>
              </div>
              <BookingForm onSuccess={() => setShowBookingForm(false)} />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}