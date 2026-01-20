"use client"

import { useState } from "react"
import { Camera, Mail, User, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function ProfileSection() {
    const [profile, setProfile] = useState({
        firstName: "Michael",
        lastName: "Anderson",
        email: "m.anderson@thunderbaseball.com",
        role: "Head Coach",
    })

    const [isEditing, setIsEditing] = useState(false)

    return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
            <p className="text-sm text-muted-foreground">Update your personal details and avatar</p>
          </div>
          <Button variant={isEditing ? "default" : "outline"} onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <Avatar className="w-24 h-24 border-2 border-border">
                <AvatarImage src="/baseball-coach-portrait.jpg" alt="Profile" />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {profile.firstName[0]}
                  {profile.lastName[0]}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            {isEditing && (
              <Button variant="ghost" size="sm" className="text-xs">
                Remove photo
              </Button>
            )}
          </div>

          {/* Form Fields */}
          <div className="flex-1 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                First Name
              </Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                disabled={!isEditing}
                className="bg-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Last Name
              </Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                disabled={!isEditing}
                className="bg-input"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                disabled={!isEditing}
                className="bg-input"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                Role
              </Label>
              <div className="flex items-center gap-2">
                <Input value={profile.role} disabled className="bg-input flex-1" />
                <Badge variant="secondary" className="shrink-0">
                  Read-only
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Contact your team administrator to change your role</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}