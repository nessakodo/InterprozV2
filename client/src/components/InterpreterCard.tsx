import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  MapPin, 
  Languages, 
  Award, 
  Clock,
  CheckCircle,
  MessageSquare,
  Calendar,
  Briefcase
} from "lucide-react";

interface InterpreterCardProps {
  interpreter: {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    profileImageUrl?: string;
    languages?: string[];
    specialties?: string[];
    rating?: string;
    isActive?: boolean;
  };
  showActions?: boolean;
  onAction?: (action: string, interpreterId: string) => void;
}

export default function InterpreterCard({ interpreter, showActions = true, onAction }: InterpreterCardProps) {
  const fullName = `${interpreter.firstName || ''} ${interpreter.lastName || ''}`.trim() || 'Interpreter';
  const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase();
  const languages = interpreter.languages || [];
  const specialties = interpreter.specialties || [];
  const rating = parseFloat(interpreter.rating || '0');

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-yellow-600";
    if (rating >= 3.5) return "text-orange-600";
    return "text-red-600";
  };

  const getAvailabilityStatus = () => {
    // In a real implementation, this would be based on actual availability data
    const isOnline = interpreter.isActive;
    return {
      status: isOnline ? "Available" : "Offline",
      color: isOnline ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
    };
  };

  const availability = getAvailabilityStatus();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          {/* Header with avatar and basic info */}
          <div className="flex items-start space-x-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={interpreter.profileImageUrl} alt={fullName} />
              <AvatarFallback className="bg-interproz-blue text-white text-lg font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {fullName}
                </h3>
                <Badge className={availability.color}>
                  {availability.status}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {rating > 0 && (
                  <div className="flex items-center space-x-1">
                    <Star className={`w-4 h-4 fill-current ${getRatingColor(rating)}`} />
                    <span className={`font-medium ${getRatingColor(rating)}`}>
                      {rating.toFixed(1)}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center space-x-1">
                  <Languages className="w-4 h-4" />
                  <span>{languages.length} languages</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4" />
                  <span>{specialties.length} specialties</span>
                </div>
              </div>
            </div>
          </div>

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Languages</p>
              <div className="flex flex-wrap gap-2">
                {languages.slice(0, 4).map((language, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {language}
                  </Badge>
                ))}
                {languages.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{languages.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Specialties */}
          {specialties.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Specialties</p>
              <div className="flex flex-wrap gap-2">
                {specialties.slice(0, 3).map((specialty, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
                {specialties.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{specialties.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-4 py-3 bg-gray-50 rounded-lg text-center">
            <div>
              <div className="text-lg font-semibold text-gray-900">24</div>
              <div className="text-xs text-gray-600">Jobs Completed</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">98%</div>
              <div className="text-xs text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">2h</div>
              <div className="text-xs text-gray-600">Avg Response</div>
            </div>
          </div>

          {/* Professional highlights */}
          <div className="mb-4 space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Certified Medical Interpreter</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Background Verified</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>HIPAA Compliant</span>
            </div>
          </div>

          {/* Action buttons */}
          {showActions && (
            <div className="flex items-center space-x-2 pt-4 border-t">
              <Button 
                className="flex-1 bg-interproz-blue hover:bg-interproz-dark"
                onClick={() => onAction?.("request", interpreter.id)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Request Interpreter
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onAction?.("message", interpreter.id)}
              >
                <MessageSquare className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onAction?.("profile", interpreter.id)}
              >
                <Briefcase className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Last active indicator */}
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Last active 2 hours ago</span>
            </span>
            {interpreter.isActive && (
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Online now</span>
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
