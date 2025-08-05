import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";

export function useRealTimeSync() {
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const connect = () => {
      // Use appropriate protocol (ws for http, wss for https)
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      
      try {
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          console.log('WebSocket connected');
          // Send user identification
          ws.send(JSON.stringify({
            type: 'identify',
            userId: user.id,
            role: user.role
          }));
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            handleRealtimeUpdate(data);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        ws.onclose = () => {
          console.log('WebSocket disconnected');
          wsRef.current = null;
          
          // Attempt to reconnect after 3 seconds
          reconnectTimeoutRef.current = setTimeout(() => {
            if (isAuthenticated) {
              connect();
            }
          }, 3000);
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

      } catch (error) {
        console.error('Error creating WebSocket connection:', error);
      }
    };

    const handleRealtimeUpdate = (data: any) => {
      switch (data.type) {
        case 'job_created':
          // Invalidate jobs queries to refresh data
          queryClient.invalidateQueries({ queryKey: ['/api/jobs'] });
          queryClient.invalidateQueries({ queryKey: [`/api/${user.role}/jobs`] });
          
          if (user.role !== 'client' || data.clientId !== user.id) {
            toast({
              title: "New Job Available",
              description: data.message || "A new job has been posted",
            });
          }
          break;

        case 'job_updated':
          // Invalidate specific job and jobs list
          queryClient.invalidateQueries({ queryKey: ['/api/jobs'] });
          queryClient.invalidateQueries({ queryKey: [`/api/${user.role}/jobs`] });
          
          if (data.userId === user.id) {
            toast({
              title: "Job Updated",
              description: data.message || "One of your jobs has been updated",
            });
          }
          break;

        case 'job_assigned':
          queryClient.invalidateQueries({ queryKey: ['/api/jobs'] });
          queryClient.invalidateQueries({ queryKey: [`/api/${user.role}/jobs`] });
          
          if (data.interpreterId === user.id) {
            toast({
              title: "Job Assigned",
              description: "You have been assigned to a new job",
            });
          }
          break;

        case 'message_received':
          // Invalidate messages queries
          queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
          
          if (data.recipientId === user.id) {
            toast({
              title: "New Message",
              description: `Message from ${data.senderName}`,
            });
          }
          break;

        case 'stats_updated':
          // Refresh dashboard stats
          queryClient.invalidateQueries({ queryKey: [`/api/${user.role}/stats`] });
          queryClient.invalidateQueries({ queryKey: ['/api/admin/stats'] });
          break;

        case 'user_status_changed':
          // Refresh user lists
          queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
          queryClient.invalidateQueries({ queryKey: ['/api/admin/interpreters'] });
          break;

        case 'notification':
          toast({
            title: data.title || "Notification",
            description: data.message,
            variant: data.variant || "default",
          });
          break;

        default:
          console.log('Unknown realtime update type:', data.type);
      }
    };

    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [isAuthenticated, user, queryClient, toast]);

  // Function to send realtime updates
  const sendUpdate = (data: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  };

  return { sendUpdate };
}