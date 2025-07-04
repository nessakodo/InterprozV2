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
import ClientDashboard from "@/pages/dashboard/client";
import InterpreterDashboard from "@/pages/dashboard/interpreter";
import AdminDashboard from "@/pages/dashboard/admin";
import Avatar from "@/pages/avatar";
import Auth from "@/pages/auth";

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
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/specialties" component={Specialties} />
          <Route path="/clients" component={Clients} />
          <Route path="/contact" component={Contact} />
          <Route path="/avatar" component={Avatar} />
          <Route path="/dashboard/client" component={ClientDashboard} />
          <Route path="/dashboard/interpreter" component={InterpreterDashboard} />
          <Route path="/dashboard/admin" component={AdminDashboard} />
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
