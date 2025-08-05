import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'job_update' | 'message' | 'system' | 'payment' | 'rating';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Load notifications from localStorage on mount
  useEffect(() => {
    if (isAuthenticated && user) {
      const stored = localStorage.getItem(`notifications_${user.id}`);
      if (stored) {
        const parsed = JSON.parse(stored).map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }));
        setNotifications(parsed);
        setUnreadCount(parsed.filter((n: Notification) => !n.read).length);
      }
    }
  }, [isAuthenticated, user]);

  // Save notifications to localStorage
  const saveNotifications = (newNotifications: Notification[]) => {
    if (user) {
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(newNotifications));
      setNotifications(newNotifications);
      setUnreadCount(newNotifications.filter(n => !n.read).length);
    }
  };

  // Add new notification
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };

    const updated = [newNotification, ...notifications.slice(0, 99)]; // Keep last 100
    saveNotifications(updated);

    // Show toast for high priority notifications
    if (notification.priority === 'high' || notification.priority === 'urgent') {
      toast({
        title: notification.title,
        description: notification.message,
        variant: notification.priority === 'urgent' ? 'destructive' : 'default',
      });
    }

    // Send email/SMS for urgent notifications
    if (notification.priority === 'urgent') {
      sendExternalNotification(notification);
    }
  };

  // Mark notification as read
  const markAsRead = (notificationId: string) => {
    const updated = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    saveNotifications(updated);
  };

  // Mark all as read
  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    saveNotifications(updated);
  };

  // Clear notification
  const clearNotification = (notificationId: string) => {
    const updated = notifications.filter(n => n.id !== notificationId);
    saveNotifications(updated);
  };

  // Clear all notifications
  const clearAll = () => {
    saveNotifications([]);
  };

  // Send external notification (email/SMS)
  const sendExternalNotification = async (notification: Partial<Notification>) => {
    if (!user) return;

    try {
      await apiRequest('POST', '/api/notifications/send', {
        userId: user.id,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        priority: notification.priority,
        channels: ['email', 'sms'] // Send via both email and SMS for urgent notifications
      });
    } catch (error) {
      console.error('Failed to send external notification:', error);
    }
  };

  // Real-time notification handlers for different events
  const handleJobUpdate = (jobData: any) => {
    const notificationMap: Record<string, { title: string; message: string; priority: 'low' | 'medium' | 'high' | 'urgent' }> = {
      'job_created': {
        title: 'New Job Available',
        message: `A new ${jobData.language} interpretation job is available`,
        priority: 'medium'
      },
      'job_assigned': {
        title: 'Job Assigned',
        message: `You have been assigned to a ${jobData.language} interpretation job`,
        priority: 'high'
      },
      'job_cancelled': {
        title: 'Job Cancelled',
        message: `Your ${jobData.language} interpretation job has been cancelled`,
        priority: 'urgent'
      },
      'job_completed': {
        title: 'Job Completed',
        message: `Your ${jobData.language} interpretation job has been completed`,
        priority: 'medium'
      },
      'job_reminder': {
        title: 'Job Reminder',
        message: `Your ${jobData.language} interpretation job starts in 1 hour`,
        priority: 'high'
      }
    };

    const notificationConfig = notificationMap[jobData.type];
    if (notificationConfig) {
      addNotification({
        ...notificationConfig,
        type: 'job_update',
        actionUrl: `/dashboard/${user?.role}/jobs`
      });
    }
  };

  const handleMessageReceived = (messageData: any) => {
    addNotification({
      title: 'New Message',
      message: `New message from ${messageData.senderName}`,
      type: 'message',
      priority: 'medium',
      actionUrl: `/dashboard/${user?.role}/messages`
    });
  };

  const handlePaymentUpdate = (paymentData: any) => {
    addNotification({
      title: 'Payment Update',
      message: paymentData.type === 'received' 
        ? `Payment of $${paymentData.amount} received`
        : `Payment of $${paymentData.amount} processed`,
      type: 'payment',
      priority: 'medium',
      actionUrl: `/dashboard/${user?.role}/invoices`
    });
  };

  const handleRatingReceived = (ratingData: any) => {
    addNotification({
      title: 'New Rating',
      message: `You received a ${ratingData.rating}-star rating`,
      type: 'rating',
      priority: 'low',
      actionUrl: `/dashboard/${user?.role}/reviews`
    });
  };

  const handleSystemNotification = (systemData: any) => {
    addNotification({
      title: systemData.title,
      message: systemData.message,
      type: 'system',
      priority: systemData.priority || 'medium'
    });
  };

  // WebSocket event handlers
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const handleRealtimeNotification = (event: any) => {
      switch (event.type) {
        case 'job_created':
        case 'job_assigned':
        case 'job_cancelled':
        case 'job_completed':
        case 'job_reminder':
          handleJobUpdate(event.data);
          break;
        case 'message_received':
          handleMessageReceived(event.data);
          break;
        case 'payment_update':
          handlePaymentUpdate(event.data);
          break;
        case 'rating_received':
          handleRatingReceived(event.data);
          break;
        case 'system_notification':
          handleSystemNotification(event.data);
          break;
      }
    };

    // Listen for custom notification events
    window.addEventListener('notification', handleRealtimeNotification as EventListener);

    return () => {
      window.removeEventListener('notification', handleRealtimeNotification as EventListener);
    };
  }, [isAuthenticated, user, notifications]);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAll,
    handleJobUpdate,
    handleMessageReceived,
    handlePaymentUpdate,
    handleRatingReceived,
    handleSystemNotification
  };
}