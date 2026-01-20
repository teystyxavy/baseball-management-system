"use client"

import { useState } from "react"
import { Key, Shield, Monitor, Smartphone, MapPin, Clock, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"


interface Session {
  id: string
  device: string
  location: string
  lastActive: string
  isCurrent: boolean
  type: "desktop" | "mobile"
}

export function SecuritySection() {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
    const [showPasswordForm, setShowPasswordForm] = useState(false)
    const [sessions] = useState<Session[]>([
        {
      id: "1",
      device: "Chrome on MacBook Pro",
      location: "San Francisco, CA",
      lastActive: "Active now",
      isCurrent: true,
      type: "desktop",
    },
    {
      id: "2",
      device: "Safari on iPhone",
      location: "San Francisco, CA",
      lastActive: "2 hours ago",
      isCurrent: false,
      type: "mobile",
    },
    {
      id: "3",
      device: "Firefox on Windows",
      location: "New York, NY",
      lastActive: "3 days ago",
      isCurrent: false,
      type: "desktop",
    },
    ])

    return (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Key className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Change Password</h2>
              <p className="text-sm text-muted-foreground">Update your password regularly for better security</p>
            </div>
          </div>
          {!showPasswordForm && (
            <Button variant="outline" onClick={() => setShowPasswordForm(true)}>
              Change Password
            </Button>
          )}
        </div>

        {showPasswordForm && (
          <div className="space-y-4 pl-0 sm:pl-13">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" className="bg-input max-w-md" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" className="bg-input max-w-md" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" className="bg-input max-w-md" />
            </div>
            <div className="flex gap-2 pt-2">
              <Button>Update Password</Button>
              <Button variant="ghost" onClick={() => setShowPasswordForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Two-Factor Authentication</h2>
              <p className="text-sm text-muted-foreground">
                {twoFactorEnabled
                  ? "Your account is protected with 2FA"
                  : "Add an extra layer of security to your account"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {twoFactorEnabled && (
              <Badge variant="default" className="bg-green-600/20 text-green-400 border-green-600/30">
                Enabled
              </Badge>
            )}
            <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Monitor className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Active Sessions</h2>
              <p className="text-sm text-muted-foreground">Manage devices where you're logged in</p>
            </div>
          </div>
          <Button variant="outline" className="text-destructive hover:text-destructive bg-transparent">
            Log Out All
          </Button>
        </div>

        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg ${
                session.isCurrent ? "bg-primary/5 border border-primary/30" : "bg-muted/30"
              }`}
            >
              <div className="flex items-center gap-3">
                {session.type === "desktop" ? (
                  <Monitor className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Smartphone className="w-5 h-5 text-muted-foreground" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{session.device}</span>
                    {session.isCurrent && (
                      <Badge variant="secondary" className="text-xs">
                        This device
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {session.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.lastActive}
                    </span>
                  </div>
                </div>
              </div>

              {!session.isCurrent && (
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive shrink-0">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
