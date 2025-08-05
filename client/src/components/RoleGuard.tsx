import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useLocation } from "wouter";

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
  redirectTo?: string;
}

export default function RoleGuard({ allowedRoles, children, redirectTo = "/" }: RoleGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        toast({
          title: "Access Denied",
          description: "Please log in to access this page.",
          variant: "destructive",
        });
        setLocation("/auth");
        return;
      }

      if (user && !allowedRoles.includes(user.role)) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page.",
          variant: "destructive",
        });
        setLocation(redirectTo);
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, redirectTo, toast, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-interproz-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || (user && !allowedRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
}