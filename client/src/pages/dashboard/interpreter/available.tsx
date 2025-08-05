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
  CheckCircle,
  AlertTriangle,
  Briefcase
} from "lucide-react";

export default function InterpreterAvailable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [filterSpecialty, setFilterSpecialty] = useState("all");
  const { toast } = useToast();

  const { data: availableJobs, isLoading } = useQuery({
    queryKey: ["/api/interpreter/jobs/available"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/interpreter/jobs/available");
      return res.json();
    },
  });

  const acceptJob = useMutation({
    mutationFn: async (jobId: string) => {
      const res = await apiRequest("POST", `/api/interpreter/jobs/${jobId}/accept`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/interpreter/jobs/available"] });
      queryClient.invalidateQueries({ queryKey: ["/api/interpreter/jobs"] });
      toast({
        title: "Job accepted",
        description: "You have successfully accepted this job",
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

  const filteredJobs = availableJobs?.filter((job: any) => {
    const matchesSearch = job.language?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.serviceType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = filterLanguage === "all" || job.language === filterLanguage;
    const matchesSpecialty = filterSpecialty === "all" || job.specialty === filterSpecialty;
    return matchesSearch && matchesLanguage && matchesSpecialty;
  }) || [];

  const getUrgencyColor = (job: any) => {
    const jobDate = new Date(job.scheduledDate || job.createdAt);
    const now = new Date();
    const hoursUntil = (jobDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (hoursUntil < 24) return 'bg-red-500';
    if (hoursUntil < 72) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getUrgencyText = (job: any) => {
    const jobDate = new Date(job.scheduledDate || job.createdAt);
    const now = new Date();
    const hoursUntil = (jobDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (hoursUntil < 24) return 'Urgent';
    if (hoursUntil < 72) return 'Soon';
    return 'Flexible';
  };

  // Get unique languages and specialties for filters
  const languages = [...new Set(availableJobs?.map((job: any) => job.language) || [])];
  const specialties = [...new Set(availableJobs?.map((job: any) => job.specialty).filter(Boolean) || [])];

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
            <h1 className="text-2xl font-bold text-gray-900">Available Jobs</h1>
            <p className="text-gray-600">Find and accept interpretation opportunities</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Available Jobs</p>
                  <p className="text-xl font-bold">{availableJobs?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm text-gray-600">Urgent Jobs</p>
                  <p className="text-xl font-bold">
                    {availableJobs?.filter((job: any) => {
                      const jobDate = new Date(job.scheduledDate || job.createdAt);
                      const now = new Date();
                      const hoursUntil = (jobDate.getTime() - now.getTime()) / (1000 * 60 * 60);
                      return hoursUntil < 24;
                    }).length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Avg Rate</p>
                  <p className="text-xl font-bold">
                    ${Math.round((availableJobs?.reduce((sum: number, job: any) => 
                      sum + (parseFloat(job.rate) || 0), 0) || 0) / (availableJobs?.length || 1))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={filterLanguage}
                  onChange={(e) => setFilterLanguage(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Languages</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
                <select
                  value={filterSpecialty}
                  onChange={(e) => setFilterSpecialty(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Specialties</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
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
              <Card className="h-full border-l-4 border-l-interproz-blue">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{job.language} - {job.serviceType}</CardTitle>
                      <p className="text-sm text-gray-600">Job #{job.id}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge className={`${getUrgencyColor(job)} text-white`}>
                        {getUrgencyText(job)}
                      </Badge>
                      <span className="text-lg font-bold text-green-600">${job.rate}/hr</span>
                    </div>
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
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="truncate">Client: {job.clientName || "Anonymous"}</span>
                    </div>
                  </div>

                  {job.specialty && (
                    <div>
                      <span className="text-sm text-gray-600">Specialty: </span>
                      <Badge variant="secondary">{job.specialty}</Badge>
                    </div>
                  )}

                  {job.requirements && (
                    <div>
                      <p className="text-sm text-gray-600">Requirements:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {job.requirements.map((req: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {job.description && (
                    <div>
                      <p className="text-sm text-gray-600">Description:</p>
                      <p className="text-sm bg-gray-50 p-3 rounded mt-1">
                        {job.description}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      <p>Posted: {new Date(job.createdAt).toLocaleDateString()}</p>
                      <p>Duration: {job.duration || "TBD"}</p>
                    </div>
                    <Button
                      onClick={() => acceptJob.mutate(job.id)}
                      disabled={acceptJob.isPending}
                      className="bg-interproz-blue hover:bg-interproz-dark"
                    >
                      {acceptJob.isPending ? (
                        "Accepting..."
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept Job
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Available Jobs</h3>
              <p className="text-gray-600">
                {searchTerm || filterLanguage !== "all" || filterSpecialty !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No jobs are currently available that match your skills"
                }
              </p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </DashboardLayout>
  );
}