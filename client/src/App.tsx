import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/components/AuthProvider";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Specialties from "@/pages/specialties";
import Clients from "@/pages/clients";
import Contact from "@/pages/contact";
// Dashboard Main Pages
import ClientDashboard from "@/pages/dashboard/client";
import InterpreterDashboard from "@/pages/dashboard/interpreter";
import AdminDashboard from "@/pages/dashboard/admin";

// Admin Sub-pages
import AdminUsers from "@/pages/dashboard/admin/users";
import AdminJobs from "@/pages/dashboard/admin/jobs";
import AdminAnalytics from "@/pages/dashboard/admin/analytics";

// Client Sub-pages
import ClientBookings from "@/pages/dashboard/client/bookings";

// Interpreter Sub-pages
import InterpreterAvailable from "@/pages/dashboard/interpreter/available";

// Shared Pages
import Avatar from "@/pages/avatar";
import Auth from "@/pages/auth";
import CalendarComponent from "@/components/Calendar";
import DashboardLayout from "@/components/DashboardLayout";

function Router() {
  let isAuthenticated = false;
  let isLoading = true;
  
  try {
    const auth = useAuth();
    isAuthenticated = auth.isAuthenticated;
    isLoading = auth.isLoading;
  } catch (error) {
    // Auth provider not ready, set defaults
    isAuthenticated = false;
    isLoading = false;
  }

  return (
    <Switch>
      {/* Always available routes */}
      <Route path="/auth" component={Auth} />
      
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/specialties" component={Specialties} />
          <Route path="/clients" component={Clients} />
          <Route path="/contact" component={Contact} />
        </>
      ) : (
        <>
          {/* Public Routes */}
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/specialties" component={Specialties} />
          <Route path="/clients" component={Clients} />
          <Route path="/contact" component={Contact} />
          <Route path="/avatar" component={Avatar} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/dashboard/admin" component={AdminDashboard} />
          <Route path="/dashboard/admin/users" component={AdminUsers} />
          <Route path="/dashboard/admin/jobs" component={AdminJobs} />
          <Route path="/dashboard/admin/analytics" component={AdminAnalytics} />
          <Route path="/dashboard/admin/calendar" component={() => (
            <DashboardLayout>
              <CalendarComponent />
            </DashboardLayout>
          )} />
          <Route path="/dashboard/admin/messages" component={() => (
            <DashboardLayout>
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Messages</h2>
                <p className="text-gray-600">Message system coming soon</p>
              </div>
            </DashboardLayout>
          )} />
          <Route path="/dashboard/admin/settings" component={() => (
            <DashboardLayout>
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
                <p className="text-gray-600">Settings panel coming soon</p>
              </div>
            </DashboardLayout>
          )} />

          {/* Client Dashboard Routes */}
          <Route path="/dashboard/client" component={ClientDashboard} />
          <Route path="/dashboard/client/bookings" component={ClientBookings} />
          <Route path="/dashboard/client/calendar" component={() => (
            <DashboardLayout>
              <CalendarComponent />
            </DashboardLayout>
          )} />
          <Route path="/dashboard/client/invoices" component={() => (
            <DashboardLayout>
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Invoices</h2>
                <p className="text-gray-600">Invoice system coming soon</p>
              </div>
            </DashboardLayout>
          )} />
          <Route path="/dashboard/client/messages" component={() => (
            <DashboardLayout>
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Messages</h2>
                <p className="text-gray-600">Message system coming soon</p>
              </div>
            </DashboardLayout>
          )} />
          <Route path="/dashboard/client/settings" component={() => (
            <DashboardLayout>
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
                <p className="text-gray-600">Settings panel coming soon</p>
              </div>
            </DashboardLayout>
          )} />

          {/* Interpreter Dashboard Routes */}
          <Route path="/dashboard/interpreter" component={InterpreterDashboard} />
          <Route path="/dashboard/interpreter/available" component={InterpreterAvailable} />
          <Route path="/dashboard/interpreter/assignments" component={() => (
            <DashboardLayout>
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">My Assignments</h2>
                <p className="text-gray-600">Assignment view coming soon</p>
              </div>
            </DashboardLayout>
          )} />
          <Route path="/dashboard/interpreter/calendar" component={() => (
            <DashboardLayout>
              <CalendarComponent />
            </DashboardLayout>
          )} />
          <Route path="/dashboard/interpreter/messages" component={() => (
            <DashboardLayout>
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Messages</h2>
                <p className="text-gray-600">Message system coming soon</p>
              </div>
            </DashboardLayout>
          )} />
          <Route path="/dashboard/interpreter/settings" component={() => (
            <DashboardLayout>
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
                <p className="text-gray-600">Settings panel coming soon</p>
              </div>
            </DashboardLayout>
          )} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
