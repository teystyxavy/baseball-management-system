"use client"

import { useState } from "react"
import { Bell, Mail, Smartphone, Trophy, TrendingUp, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function NotificationsSection() {
  const [notifications, setNotifications] = useState({
    gameCompletion: { email: true, inApp: true },
    performanceAlerts: { email: false, inApp: true },
    weeklySummary: { email: true, inApp: false },
    teamUpdates: { email: true, inApp: true },
  })

  const updateNotification = (key: keyof typeof notifications, channel: "email" | "inApp", value: boolean) => {
    setNotifications({
      ...notifications,
      [key]: { ...notifications[key], [channel]: value },
    })
  }

  const notificationItems = [
    {
      key: "gameCompletion" as const,
      icon: Trophy,
      title: "Game Completion Alerts",
      description: "Get notified when games end with final scores",
    },
    {
      key: "performanceAlerts" as const,
      icon: TrendingUp,
      title: "Performance Threshold Alerts",
      description: "Alerts when players hit milestone stats",
    },
    {
      key: "weeklySummary" as const,
      icon: Calendar,
      title: "Weekly Stats Summary",
      description: "Receive a weekly digest of team performance",
    },
    {
      key: "teamUpdates" as const,
      icon: Bell,
      title: "Team Updates",
      description: "Roster changes, schedule updates, and announcements",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Notification Preferences</h2>
            <p className="text-sm text-muted-foreground">Choose how you want to be notified</p>
          </div>
          <Button>Save Preferences</Button>
        </div>

        {/* Channel Headers */}
        <div className="hidden sm:grid grid-cols-[1fr,80px,80px] gap-4 pb-4 border-b border-border mb-4">
          <div></div>
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            Email
          </div>
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <Smartphone className="w-4 h-4" />
            In-App
          </div>
        </div>

        <div className="space-y-4">
          {notificationItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.key}
                className="grid sm:grid-cols-[1fr,80px,80px] gap-4 items-center py-4 border-b border-border last:border-0"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <Label className="text-base font-medium">{item.title}</Label>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>

                {/* Mobile: Show labels */}
                <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-0">
                  <span className="text-sm text-muted-foreground sm:hidden">Email</span>
                  <Switch
                    checked={notifications[item.key].email}
                    onCheckedChange={(checked) => updateNotification(item.key, "email", checked)}
                  />
                </div>
                <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-0">
                  <span className="text-sm text-muted-foreground sm:hidden">In-App</span>
                  <Switch
                    checked={notifications[item.key].inApp}
                    onCheckedChange={(checked) => updateNotification(item.key, "inApp", checked)}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
