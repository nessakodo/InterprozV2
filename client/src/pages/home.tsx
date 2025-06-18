import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Star, 
  TrendingUp, 
  Users, 
  MessageSquare,
  FileText,
  Award
} from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-interproz-blue border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const getDashboardPath = () => {
    if (!user) return "/";
    return `/dashboard/${user.role}`;
  };

  const getWelcomeMessage = () => {
    const firstName = user?.firstName || "User";
    switch (user?.role) {
      case "client":
        return `Welcome back, ${firstName}! Ready to book your next interpretation session?`;
      case "interpreter":
        return `Welcome back, ${firstName}! Check out the latest job opportunities.`;
      case "admin":
        return `Welcome back, ${firstName}! Here's your platform overview.`;
      default:
        return `Welcome back, ${firstName}!`;
    }
  };

  const quickActions = {
    client: [
      { title: "Book Interpreter", description: "Schedule a new interpretation session", icon: Calendar, color: "bg-blue-500" },
      { title: "View Bookings", description: "Manage your upcoming appointments", icon: Clock, color: "bg-green-500" },
      { title: "Rate Services", description: "Provide feedback on recent sessions", icon: Star, color: "bg-yellow-500" },
      { title: "View Invoices", description: "Check billing and payment history", icon: FileText, color: "bg-purple-500" }
    ],
    interpreter: [
      { title: "Available Jobs", description: "Browse and claim new opportunities", icon: TrendingUp, color: "bg-blue-500" },
      { title: "My Schedule", description: "View your upcoming sessions", icon: Calendar, color: "bg-green-500" },
      { title: "Messages", description: "Communicate with clients", icon: MessageSquare, color: "bg-purple-500" },
      { title: "Earnings", description: "Track your performance and income", icon: Award, color: "bg-yellow-500" }
    ],
    admin: [
      { title: "User Management", description: "Manage clients and interpreters", icon: Users, color: "bg-blue-500" },
      { title: "Platform Analytics", description: "View system metrics and reports", icon: TrendingUp, color: "bg-green-500" },
      { title: "Job Monitoring", description: "Oversee active sessions", icon: Clock, color: "bg-purple-500" },
      { title: "System Settings", description: "Configure platform parameters", icon: FileText, color: "bg-yellow-500" }
    ]
  };

  const currentActions = quickActions[user?.role as keyof typeof quickActions] || quickActions.client;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-interproz-blue to-interproz-dark rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{getWelcomeMessage()}</h1>
                <p className="text-blue-100 text-lg">
                  {user?.role === "client" && "Connect with professional interpreters for all your communication needs."}
                  {user?.role === "interpreter" && "Help clients communicate effectively across language barriers."}
                  {user?.role === "admin" && "Monitor and manage the interpretation platform."}
                </p>
              </div>
              <div className="hidden md:block">
                <Badge variant="secondary" className="bg-white text-interproz-blue">
                  {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} Account
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentActions.map((action, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dashboard CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Ready to get started?
              </h3>
              <p className="text-gray-600 mb-6">
                Access your full dashboard to manage all your interpretation needs and activities.
              </p>
              <Button 
                size="lg"
                className="bg-interproz-blue hover:bg-interproz-dark"
                onClick={() => window.location.href = getDashboardPath()}
              >
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
