import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"client" | "interpreter" | "admin">("client");
  const { loginMutation, registerMutation } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      loginMutation.mutate(
        { username, password },
        {
          onSuccess: () => {
            onClose();
            setUsername("");
            setPassword("");
          },
        }
      );
    } else {
      registerMutation.mutate(
        { username, email, password, role },
        {
          onSuccess: () => {
            onClose();
            setUsername("");
            setEmail("");
            setPassword("");
          },
        }
      );
    }
  };

  const fillTestCredentials = (testRole: "client" | "interpreter" | "admin") => {
    setUsername(testRole);
    setEmail(`${testRole}@example.com`);
    setPassword(`${testRole}123`);
    setRole(testRole);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? "Sign In" : "Sign Up"}
          </h2>
          <p className="text-gray-600 mt-1">
            {isLogin ? "Welcome back!" : "Create your account"}
          </p>
        </div>

        {/* Test Credentials */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700 font-medium mb-2">Test Credentials:</p>
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => fillTestCredentials("client")}
              className="block w-full text-left text-xs text-blue-600 hover:text-blue-800"
            >
              Client: client / client123
            </button>
            <button
              type="button"
              onClick={() => fillTestCredentials("interpreter")}
              className="block w-full text-left text-xs text-blue-600 hover:text-blue-800"
            >
              Interpreter: interpreter / interpreter123
            </button>
            <button
              type="button"
              onClick={() => fillTestCredentials("admin")}
              className="block w-full text-left text-xs text-blue-600 hover:text-blue-800"
            >
              Admin: admin / admin123
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">{isLogin ? "Username" : "Username"}</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          {!isLogin && (
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>
          )}

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          {!isLogin && (
            <div>
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as "client" | "interpreter" | "admin")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-interproz-blue focus:border-interproz-blue"
              >
                <option value="client">Client</option>
                <option value="interpreter">Interpreter</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-interproz-blue hover:bg-interproz-dark"
            disabled={loginMutation.isPending || registerMutation.isPending}
          >
            {loginMutation.isPending || registerMutation.isPending
              ? "Loading..."
              : isLogin
              ? "Sign In"
              : "Sign Up"}
          </Button>
        </form>

        {/* Toggle */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setEmail("");
              setPassword("");
            }}
            className="text-sm text-interproz-blue hover:text-interproz-dark"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>

        {/* Guest Access */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Continue as guest
          </button>
        </div>
      </motion.div>
    </div>
  );
}