import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/AuthProvider';
import { 
  Bell, 
  X, 
  Calendar, 
  DollarSign, 
  MessageSquare, 
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPanel, setShowPanel] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 50)); // Keep only 50 latest
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Simulate real-time notifications based on user role
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const random = Math.random();

      // Role-based notification simulation
      if (user.role === 'client' && random < 0.1) {
        const clientNotifications = [
          {
            type: 'info' as const,
            title: 'Booking Reminder',
            message: 'Your Spanish interpretation session is tomorrow at 2:00 PM',
            actionUrl: '/dashboard/client?tab=calendar',
            actionText: 'View Calendar',
          },
          {
            type: 'success' as const,
            title: 'Interpreter Assigned',
            message: 'Maria Garcia has been assigned to your upcoming job',
            actionUrl: '/dashboard/client?tab=bookings',
            actionText: 'View Details',
          },
          {
            type: 'warning' as const,
            title: 'Payment Due',
            message: 'Invoice #INV-2024-001 is due in 3 days',
            actionUrl: '/dashboard/client?tab=invoices',
            actionText: 'Pay Now',
          },
        ];
        
        const notification = clientNotifications[Math.floor(Math.random() * clientNotifications.length)];
        addNotification(notification);
      }

      if (user.role === 'interpreter' && random < 0.08) {
        const interpreterNotifications = [
          {
            type: 'info' as const,
            title: 'New Job Available',
            message: 'Medical interpretation needed - Spanish to English',
            actionUrl: '/dashboard/interpreter?tab=available',
            actionText: 'View Job',
          },
          {
            type: 'success' as const,
            title: 'Payment Received',
            message: 'You received $150 for your last interpretation session',
            actionUrl: '/dashboard/interpreter?tab=payments',
            actionText: 'View Payments',
          },
          {
            type: 'warning' as const,
            title: 'Schedule Conflict',
            message: 'Two jobs scheduled at the same time on Friday',
            actionUrl: '/dashboard/interpreter?tab=calendar',
            actionText: 'Resolve Conflict',
          },
        ];
        
        const notification = interpreterNotifications[Math.floor(Math.random() * interpreterNotifications.length)];
        addNotification(notification);
      }

      if (user.role === 'admin' && random < 0.05) {
        const adminNotifications = [
          {
            type: 'error' as const,
            title: 'System Alert',
            message: 'High server load detected - monitoring required',
            actionUrl: '/dashboard/admin?tab=overview',
            actionText: 'View Analytics',
          },
          {
            type: 'info' as const,
            title: 'New User Registration',
            message: '5 new interpreters registered today',
            actionUrl: '/dashboard/admin?tab=users',
            actionText: 'Review Users',
          },
          {
            type: 'success' as const,
            title: 'Revenue Milestone',
            message: 'Monthly revenue target reached!',
            actionUrl: '/dashboard/admin?tab=overview',
            actionText: 'View Reports',
          },
        ];
        
        const notification = adminNotifications[Math.floor(Math.random() * adminNotifications.length)];
        addNotification(notification);
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, [user]);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const contextValue: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      
      {/* Notification Bell */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setShowPanel(!showPanel)}
          variant="outline"
          size="sm"
          className="relative bg-white shadow-lg border-gray-200 hover:bg-gray-50"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Notification Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-16 right-4 w-80 max-h-96 z-50"
          >
            <Card className="shadow-xl border-gray-200">
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && (
                      <Button
                        onClick={markAllAsRead}
                        variant="ghost"
                        size="sm"
                        className="text-xs text-gray-600 hover:text-gray-900"
                      >
                        Mark all read
                      </Button>
                    )}
                    <Button
                      onClick={() => setShowPanel(false)}
                      variant="ghost"
                      size="sm"
                      className="p-1"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          {getIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeNotification(notification.id);
                                }}
                                variant="ghost"
                                size="sm"
                                className="p-1 h-auto text-gray-400 hover:text-gray-600"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-400">
                                {notification.timestamp.toLocaleTimeString()}
                              </span>
                              {notification.actionUrl && (
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.location.href = notification.actionUrl!;
                                  }}
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-blue-600 hover:text-blue-800 p-1 h-auto"
                                >
                                  {notification.actionText}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}