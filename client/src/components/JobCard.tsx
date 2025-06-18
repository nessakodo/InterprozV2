import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Video, 
  Users,
  MessageSquare,
  Star,
  DollarSign,
  FileText
} from "lucide-react";

interface JobCardProps {
  job: {
    id: number;
    language: string;
    specialty: string;
    modality: "on_site" | "phone" | "video";
    startTime: string;
    endTime?: string;
    estimatedDuration?: number;
    status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
    location?: string;
    notes?: string;
    rate?: string;
    totalAmount?: string;
    clientId?: string;
    interpreterId?: string;
  };
  userRole: "client" | "interpreter" | "admin";
  onAction?: (action: string, jobId: number) => void;
}

export default function JobCard({ job, userRole, onAction }: JobCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "in_progress": return "bg-yellow-100 text-yellow-800";
      case "pending": return "bg-gray-100 text-gray-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getModalityIcon = (modality: string) => {
    switch (modality) {
      case "on_site": return Users;
      case "phone": return Phone;
      case "video": return Video;
      default: return Users;
    }
  };

  const getModalityLabel = (modality: string) => {
    switch (modality) {
      case "on_site": return "On-Site";
      case "phone": return "Phone (OPI)";
      case "video": return "Video (VRI)";
      default: return modality;
    }
  };

  const ModalityIcon = getModalityIcon(job.modality);
  const startDate = new Date(job.startTime);
  const isUpcoming = startDate > new Date();
  const isPast = job.status === "completed" || job.status === "cancelled";

  const getActionButtons = () => {
    const buttons = [];

    if (userRole === "client") {
      if (job.status === "pending") {
        buttons.push(
          <Button 
            key="cancel"
            variant="outline" 
            size="sm"
            onClick={() => onAction?.("cancel", job.id)}
            className="text-red-600 hover:text-red-700"
          >
            Cancel
          </Button>
        );
      }
      if (job.status === "completed" && !job.interpreterId) {
        buttons.push(
          <Button 
            key="rate"
            variant="outline" 
            size="sm"
            onClick={() => onAction?.("rate", job.id)}
            className="text-yellow-600 hover:text-yellow-700"
          >
            <Star className="w-3 h-3 mr-1" />
            Rate
          </Button>
        );
      }
      buttons.push(
        <Button 
          key="details"
          variant="ghost" 
          size="sm"
          onClick={() => onAction?.("details", job.id)}
        >
          View Details
        </Button>
      );
    }

    if (userRole === "interpreter") {
      if (job.status === "confirmed" || job.status === "in_progress") {
        buttons.push(
          <Button 
            key="join"
            className="bg-interproz-blue hover:bg-interproz-dark"
            size="sm"
            onClick={() => onAction?.("join", job.id)}
          >
            Join Session
          </Button>
        );
      }
      if (job.status === "completed") {
        buttons.push(
          <Button 
            key="invoice"
            variant="outline" 
            size="sm"
            onClick={() => onAction?.("invoice", job.id)}
          >
            <FileText className="w-3 h-3 mr-1" />
            Invoice
          </Button>
        );
      }
    }

    if (userRole === "admin") {
      buttons.push(
        <Button 
          key="manage"
          variant="ghost" 
          size="sm"
          onClick={() => onAction?.("manage", job.id)}
        >
          Manage
        </Button>
      );
    }

    return buttons;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-interproz-light rounded-lg flex items-center justify-center">
                <ModalityIcon className="w-6 h-6 text-interproz-blue" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {job.language} - {job.specialty}
                  </h3>
                  <Badge className={getStatusColor(job.status)}>
                    {job.status.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{getModalityLabel(job.modality)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Job #{job.id}</p>
              {job.totalAmount && (
                <p className="text-sm text-green-600 font-medium">${job.totalAmount}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{startDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            {job.estimatedDuration && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{job.estimatedDuration} min</span>
              </div>
            )}
            {job.location && job.modality === "on_site" && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{job.location}</span>
              </div>
            )}
            {job.rate && (
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4" />
                <span>${job.rate}/hr</span>
              </div>
            )}
          </div>

          {job.notes && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Notes:</strong> {job.notes}
              </p>
            </div>
          )}

          {/* Role-specific information */}
          {userRole === "interpreter" && job.status === "confirmed" && isUpcoming && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                Upcoming session - prepare materials for {job.specialty} interpretation
              </p>
            </div>
          )}

          {userRole === "client" && job.status === "pending" && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 font-medium">
                Waiting for interpreter assignment - we'll notify you once confirmed
              </p>
            </div>
          )}

          {/* Action buttons */}
          {getActionButtons().length > 0 && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2">
                {job.interpreterId && userRole === "client" && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onAction?.("message", job.id)}
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Message
                  </Button>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {getActionButtons()}
              </div>
            </div>
          )}

          {/* Time indicators */}
          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <span>
              {isUpcoming && "Scheduled"}
              {job.status === "in_progress" && "In Progress"}
              {isPast && "Completed"}
            </span>
            {job.endTime && (
              <span>
                Duration: {Math.round((new Date(job.endTime).getTime() - new Date(job.startTime).getTime()) / (1000 * 60))} min
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
