import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign,
  User,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function ClientBookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showNewBooking, setShowNewBooking] = useState(false);
  const { toast } = useToast();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["/api/client/jobs"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/client/jobs");
      return res.json();
    },
  });

  const cancelJob = useMutation({
    mutationFn: async (jobId: string) => {
      const res = await apiRequest("PATCH", `/api/jobs/${jobId}`, { status: "cancelled" });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/client/jobs"] });
      toast({
        title: "Job cancelled",
        description: "Your booking has been cancelled successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const filteredJobs = jobs?.filter((job: any) => {
    const matchesSearch = job.language?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.serviceType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.specialty?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || job.status === filterStatus;
    return matchesSearch && matchesFilter;
  }) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      case 'assigned': return 'bg-blue-500';
      case 'in-progress': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const canCancelJob = (job: any) => {
    return job.status === 'pending' || job.status === 'assigned';
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-interproz-blue"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-interproz-blue" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
              <p className="text-gray-600">Manage your interpretation services</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowNewBooking(true)}
            className="bg-interproz-blue hover:bg-interproz-dark"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Booking
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Bookings</option>
                  <option value="pending">Pending</option>
                  <option value="assigned">Assigned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job: any) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.01 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{job.language} - {job.serviceType}</CardTitle>
                      <p className="text-sm text-gray-600">Booking #{job.id}</p>
                    </div>
                    <Badge className={`${getStatusColor(job.status)} text-white`}>
                      {job.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{new Date(job.scheduledDate || job.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{job.scheduledTime || "TBD"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="truncate">{job.location || "Remote"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span>${job.rate || "0"}/hr</span>
                    </div>
                  </div>

                  {job.specialty && (
                    <div>
                      <span className="text-sm text-gray-600">Specialty: </span>
                      <Badge variant="secondary">{job.specialty}</Badge>
                    </div>
                  )}

                  {job.interpreterName && (
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Interpreter: {job.interpreterName}</span>
                      {job.interpreterRating && (
                        <span className="text-sm text-gray-600">
                          ({job.interpreterRating}/5 ⭐)
                        </span>
                      )}
                    </div>
                  )}

                  {job.description && (
                    <div>
                      <p className="text-sm text-gray-600">Description:</p>
                      <p className="text-sm bg-gray-50 p-2 rounded mt-1">
                        {job.description.length > 100 
                          ? `${job.description.substring(0, 100)}...`
                          : job.description
                        }
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm text-gray-600">
                      Created: {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      {job.status === 'completed' && (
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Rate
                        </Button>
                      )}
                      {canCancelJob(job) && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => cancelJob.mutate(job.id)}
                          disabled={cancelJob.isPending}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookings Found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "You haven't made any bookings yet"
                }
              </p>
              <Button 
                onClick={() => setShowNewBooking(true)}
                className="bg-interproz-blue hover:bg-interproz-dark"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Booking
              </Button>
            </CardContent>
          </Card>
        )}

        {/* New Booking Modal */}
        {showNewBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Create New Booking</h3>
              <p className="text-gray-600 mb-4">
                Use the booking form to schedule your interpretation service.
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowNewBooking(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setShowNewBooking(false);
                    // Navigate to booking form
                    window.location.href = "/dashboard/client/book";
                  }}
                  className="flex-1 bg-interproz-blue hover:bg-interproz-dark"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}