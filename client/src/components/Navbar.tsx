import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LanguageToggle from "./LanguageToggle";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Specialties", href: "/specialties" },
    { name: "Clients", href: "/clients" },
    { name: "Contact", href: "/contact" },
  ];

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
                  <Link href={getDashboardPath()}>
                    <Button variant="ghost" className="text-gray-700 hover:text-interproz-blue">
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="text-gray-700 hover:text-interproz-blue"
                    onClick={() => window.location.href = "/api/logout"}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-gray-700 hover:text-interproz-blue"
                    onClick={() => window.location.href = "/api/login"}
                  >
                    Login
                  </Button>
                  <Button 
                    className="bg-interproz-blue text-white hover:bg-interproz-dark"
                    onClick={() => window.location.href = "/api/login"}
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
                            window.location.href = "/api/logout";
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
                            window.location.href = "/api/login";
                          }}
                        >
                          Login
                        </Button>
                        <Button 
                          className="w-full bg-interproz-blue hover:bg-interproz-dark"
                          onClick={() => {
                            setIsOpen(false);
                            window.location.href = "/api/login";
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
    </motion.nav>
  );
}
