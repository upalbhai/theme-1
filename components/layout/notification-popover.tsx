"use client";

import { useState, useEffect } from "react";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Bell, Clock, ChevronRight, CheckCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDistanceToNow } from "date-fns";

export type Notification = {
  _id: string;
  title: string;
  message: string;
  type?: "success" | "warning" | "error" | "info";
  isRead: boolean;
  createdAt: string;
  location?: string;
};

// Mock data for the theme demonstration
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    _id: "1",
    title: "New Customer Signup",
    message: "Elena Rostova has joined Starlight Media.",
    type: "success",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    location: "/crm/customers",
  },
  {
    _id: "2",
    title: "Server Load Warning",
    message: "CPU utilization exceeded 85% for 10 minutes.",
    type: "warning",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    location: "/analytics",
  },
  {
    _id: "3",
    title: "Failed Payment",
    message: "Payment of $145.00 failed for Acme Corp.",
    type: "error",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

export function NotificationPopover() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [isLoading, setIsLoading] = useState(false);
  const [isMarkingAll, setIsMarkingAll] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      setNotifications((prev) =>
        prev.map((n) => (n._id === notification._id ? { ...n, isRead: true } : n))
      );
    }
    setOpen(false);
    if (notification.location) {
      router.push(notification.location);
    }
  };

  const handleMarkAllRead = () => {
    setIsMarkingAll(true);
    setTimeout(() => {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setIsMarkingAll(false);
    }, 600);
  };

  const handleViewAll = () => {
    setOpen(false);
    // router.push("/profile/notifications");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={
        <Button variant="ghost" size="icon" className="relative h-10 w-10 hover:bg-accent hover:border hover:border-primary/50 transition-all duration-200">
          <Bell size={22} />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold shadow-lg animate-pulse p-0 leading-none"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      } />
      <PopoverContent
        align="end"
        className="w-[340px] sm:w-96 p-0 shadow-2xl border-border bg-background/95 backdrop-blur-xl"
        sideOffset={8}
      >
        <div className="flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between p-3 sm:p-4 gap-2 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-base">
                Notifications
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <>
                  <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5 font-semibold shadow-sm">
                    {unreadCount} unread
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
                    onClick={handleMarkAllRead}
                    disabled={isMarkingAll || unreadCount === 0}
                  >
                    {isMarkingAll ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <>
                        <CheckCheck className="h-3.5 w-3.5 mr-1" />
                        Mark all read
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto overflow-x-hidden">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground mt-4">
                  Loading notifications...
                </p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="relative mb-4">
                  <div className="relative p-4 bg-muted/50 rounded-full">
                    <Bell className="h-10 w-10 text-muted-foreground/50" />
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  No notifications
                </p>
                <p className="text-xs text-muted-foreground text-center">
                  You're all caught up!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {notifications.map((notification, index) => (
                  <div
                    key={notification._id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`group relative p-4 cursor-pointer transition-all duration-200 ${
                      notification.isRead
                        ? "bg-transparent hover:bg-muted/50"
                        : "bg-primary/5 hover:bg-primary/10 border-l-2 border-l-primary"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {!notification.isRead && (
                        <div className="flex-shrink-0 mt-1">
                          <span className="w-2.5 h-2.5 bg-primary rounded-full flex items-center justify-center">
                            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-ping absolute"></span>
                          </span>
                        </div>
                      )}

                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={`text-sm font-semibold leading-tight ${
                              notification.isRead
                                ? "text-muted-foreground"
                                : "text-foreground"
                            }`}
                          >
                            {notification.title}
                          </p>
                          {notification.type && (
                            <Badge
                              className={`text-[10px] px-1.5 py-0 ${
                                notification.type === "success"
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"
                                  : notification.type === "warning"
                                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20"
                                  : notification.type === "error"
                                  ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20"
                                  : "bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20"
                              }`}
                            >
                              {notification.type}
                            </Badge>
                          )}
                        </div>

                        <p
                          className={`text-xs leading-relaxed line-clamp-2 ${
                            notification.isRead
                              ? "text-muted-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {notification.message}
                        </p>

                        <div className="flex items-center gap-1.5 pt-1">
                          <Clock className="h-3 w-3 text-muted-foreground/70 flex-shrink-0" />
                          <span className="text-[11px] text-muted-foreground/70">
                            {mounted ? formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true }) : "just now"}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="h-4 w-4 text-muted-foreground/50 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-border bg-muted/10 p-3">
              <Button
                variant="ghost"
                className="w-full justify-between text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200 group"
                onClick={handleViewAll}
              >
                <span className="text-sm font-medium">View all notifications</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
