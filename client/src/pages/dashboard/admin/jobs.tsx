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
  Briefcase, 
  Calendar,
  DollarSign,
  User,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

export default function AdminJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { toast } = useToast();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["/api/admin/jobs"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/admin/jobs");
      return res.json();
    },
  });

  const { data: interpreters } = useQuery({
    queryKey: ["/api/admin/interpreters"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/admin/interpreters");
      return res.json();
    },
  });

  const assignJob = useMutation({
    mutationFn: async ({ jobId, interpreterId }: { jobId: string; interpreterId: string }) => {
      const res = await apiRequest("POST", `/api/admin/jobs/${jobId}/assign`, { interpreterId });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/jobs"] });
      toast({
        title: "Job assigned",
        description: "Job has been assigned to interpreter successfully",
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

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
        <div className="flex items-center space-x-3">
          <Briefcase className="h-8 w-8 text-interproz-blue" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
            <p className="text-gray-600">Manage all platform jobs and assignments</p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs..."
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
                  <option value="all">All Jobs</option>
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

        {/* Jobs Grid */}
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
                      <p className="text-sm text-gray-600">Job #{job.id}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(job.status)}
                      <Badge className={`${getStatusColor(job.status)} text-white`}>
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
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
                      <span>{job.location || "Remote"}</span>
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

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Client: {job.clientName || "Unknown"}</span>
                    </div>
                    {job.interpreterName && (
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">Interpreter: {job.interpreterName}</span>
                      </div>
                    )}
                  </div>

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

                  {job.status === 'pending' && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600 mb-2">Assign to interpreter:</p>
                      <div className="flex space-x-2">
                        <select 
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                          onChange={(e) => {
                            if (e.target.value) {
                              assignJob.mutate({
                                jobId: job.id,
                                interpreterId: e.target.value
                              });
                            }
                          }}
                          disabled={assignJob.isPending}
                        >
                          <option value="">Select interpreter...</option>
                          {interpreters?.filter((interpreter: any) => 
                            interpreter.languages?.includes(job.language) &&
                            interpreter.specialties?.includes(job.specialty)
                          ).map((interpreter: any) => (
                            <option key={interpreter.id} value={interpreter.id}>
                              {interpreter.firstName} {interpreter.lastName} - {interpreter.rating}/5 ⭐
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Jobs Found</h3>
              <p className="text-gray-600">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "No jobs have been created yet"
                }
              </p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </DashboardLayout>
  );
}