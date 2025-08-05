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
  UserCheck, 
  UserX, 
  Edit,
  MoreVertical,
  Users as UsersIcon
} from "lucide-react";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { toast } = useToast();

  const { data: users, isLoading } = useQuery({
    queryKey: ["/api/admin/users"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/admin/users");
      return res.json();
    },
  });

  const toggleUserStatus = useMutation({
    mutationFn: async ({ userId, isActive }: { userId: string; isActive: boolean }) => {
      const res = await apiRequest("PATCH", `/api/admin/users/${userId}`, { isActive });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "User updated",
        description: "User status has been updated successfully",
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

  const filteredUsers = users?.filter((user: any) => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "active" && user.isActive) ||
                         (filterStatus === "inactive" && !user.isActive);
    return matchesSearch && matchesFilter;
  }) || [];

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <UsersIcon className="h-8 w-8 text-interproz-blue" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600">Manage all platform users</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Users</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user: any) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-interproz-blue rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {user.firstName?.[0] ?? user.username[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {user.firstName && user.lastName 
                            ? `${user.firstName} ${user.lastName}`
                            : user.username
                          }
                        </h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Role:</span>
                    <Badge variant="secondary" className="capitalize">
                      {user.role}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge 
                      variant={user.isActive ? "default" : "destructive"}
                      className={user.isActive ? "bg-green-500" : ""}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  {user.role === "interpreter" && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Verified:</span>
                        <Badge variant={user.isVerified ? "default" : "secondary"}>
                          {user.isVerified ? "Verified" : "Pending"}
                        </Badge>
                      </div>
                      
                      {user.rating && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Rating:</span>
                          <span className="text-sm font-medium">
                            {user.rating}/5 ⭐
                          </span>
                        </div>
                      )}
                    </>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-600">Joined:</span>
                    <span className="text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button
                      size="sm"
                      variant={user.isActive ? "destructive" : "default"}
                      className="flex-1"
                      onClick={() => toggleUserStatus.mutate({
                        userId: user.id,
                        isActive: !user.isActive
                      })}
                      disabled={toggleUserStatus.isPending}
                    >
                      {user.isActive ? (
                        <>
                          <UserX className="h-4 w-4 mr-1" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-4 w-4 mr-1" />
                          Activate
                        </>
                      )}
                    </Button>
                    
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Users Found</h3>
              <p className="text-gray-600">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "No users have been registered yet"
                }
              </p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </DashboardLayout>
  );
}