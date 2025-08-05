import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LanguageToggle from "./LanguageToggle";
import LoginModal from "./LoginModal";
import { useAuth } from "@/components/AuthProvider";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const { isAuthenticated, user, logoutMutation } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const getNavigation = () => {
    const baseNav = [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Specialties", href: "/specialties" },
      { name: "Clients", href: "/clients" },
      { name: "Contact", href: "/contact" },
    ];

    if (!isAuthenticated) return baseNav;

    // Add role-specific navigation for authenticated users
    const dashboardPath = `/dashboard/${user?.role}`;
    return [
      { name: "Home", href: "/" },
      { name: "Dashboard", href: dashboardPath },
      ...(user?.role === "admin" ? [
        { name: "Users", href: `${dashboardPath}/users` },
        { name: "Analytics", href: `${dashboardPath}/analytics` }
      ] : []),
      ...(user?.role === "client" ? [
        { name: "Book Service", href: `${dashboardPath}/book` },
        { name: "My Jobs", href: `${dashboardPath}/jobs` }
      ] : []),
      ...(user?.role === "interpreter" ? [
        { name: "Available Jobs", href: `${dashboardPath}/available` },
        { name: "My Jobs", href: `${dashboardPath}/jobs` }
      ] : []),
      { name: "AI Avatar", href: "/avatar" },
    ];
  };

  const navigation = getNavigation();

  const getDashboardPath = () => {
    if (!user) return "/";
    return `/dashboard/${user.role}`;
  };

  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <svg width="200" height="48" viewBox="0 0 200 48" fill="none">
                  <text x="0" y="32" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="700" fill="#2A64B2">interproz</text>
                  <text x="0" y="44" fontFamily="Inter, sans-serif" fontSize="12" fontStyle="italic" fill="#0F172A">Interpreting Professionals</text>
                </svg>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.span
                  className={`font-medium transition-colors duration-200 cursor-pointer ${
                    location === item.href
                      ? "text-interproz-blue"
                      : "text-gray-700 hover:text-interproz-blue"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Language Toggle and Auth */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-8 h-8 bg-interproz-blue rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        {user?.firstName?.[0] ?? user?.username[0].toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium text-gray-700">
                      {user?.firstName ?? user?.username}
                    </span>
                    <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
                      {user?.role}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-gray-700 hover:text-interproz-blue"
                    onClick={() => logoutMutation.mutate()}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-gray-700 hover:text-interproz-blue"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Login
                  </Button>
                  <Button 
                    className="bg-interproz-blue text-white hover:bg-interproz-dark"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <motion.span
                        className={`block py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer ${
                          location === item.href
                            ? "bg-interproz-light text-interproz-blue"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setIsOpen(false)}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.name}
                      </motion.span>
                    </Link>
                  ))}
                  
                  <div className="border-t pt-4">
                    {isAuthenticated ? (
                      <>
                        <Link href={getDashboardPath()}>
                          <Button variant="outline" className="w-full mb-2" onClick={() => setIsOpen(false)}>
                            Dashboard
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => {
                            setIsOpen(false);
                            logoutMutation.mutate();
                          }}
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          variant="outline" 
                          className="w-full mb-2"
                          onClick={() => {
                            setIsOpen(false);
                            setShowLoginModal(true);
                          }}
                        >
                          Login
                        </Button>
                        <Button 
                          className="w-full bg-interproz-blue hover:bg-interproz-dark"
                          onClick={() => {
                            setIsOpen(false);
                            setShowLoginModal(true);
                          }}
                        >
                          Sign Up
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showLoginModal && (
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
