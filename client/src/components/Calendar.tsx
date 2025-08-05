import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'job' | 'meeting' | 'deadline';
  status?: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
}

interface CalendarProps {
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  compact?: boolean;
}

export default function Calendar({ events = [], onEventClick, compact = false }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const { monthName, year, daysInMonth, firstDayOfMonth, today } = useMemo(() => {
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1).getDay();
    const today = new Date();
    
    return { monthName, year, daysInMonth, firstDayOfMonth, today };
  }, [currentDate]);

  const getEventsForDate = (date: number) => {
    const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);
    return events.filter(event => 
      event.date.getDate() === date &&
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'job':
        return 'bg-blue-500 text-white';
      case 'meeting':
        return 'bg-green-500 text-white';
      case 'deadline':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const isToday = (date: number) => {
    return today.getDate() === date &&
           today.getMonth() === currentDate.getMonth() &&
           today.getFullYear() === currentDate.getFullYear();
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  if (compact) {
    // Compact view for dashboard
    const upcomingEvents = events
      .filter(event => event.date >= today)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 5);

    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Upcoming Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => onEventClick?.(event)}
                >
                  <div>
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-gray-600">
                      {event.date.toLocaleDateString()} • {event.time}
                    </p>
                  </div>
                  <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                    {event.type}
                  </Badge>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center py-4">
              No upcoming events
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">
            {monthName} {year}
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {/* Empty days for calendar alignment */}
          {emptyDays.map(day => (
            <div key={`empty-${day}`} className="p-2 h-20"></div>
          ))}
          
          {/* Calendar days */}
          {days.map(date => {
            const dayEvents = getEventsForDate(date);
            const isCurrentDay = isToday(date);
            
            return (
              <motion.div
                key={date}
                className={`p-2 h-20 border rounded-lg cursor-pointer relative ${
                  isCurrentDay 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'hover:bg-gray-50 border-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`text-sm font-medium ${
                  isCurrentDay ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {date}
                </div>
                
                {/* Event indicators */}
                <div className="mt-1 space-y-1">
                  {dayEvents.slice(0, 2).map((event, index) => (
                    <div
                      key={event.id}
                      className={`text-xs px-1 py-0.5 rounded truncate ${getEventTypeColor(event.type)}`}
                      onClick={() => onEventClick?.(event)}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}