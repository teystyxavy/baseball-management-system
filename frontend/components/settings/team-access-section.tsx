"use client"

import { useState } from "react"
import { Users, Shield, Plus, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Team {
  id: string
  name: string
  logo?: string
  role: string
  memberCount: number
  isPrimary: boolean
}

export function TeamAccessSection() {
  const [teams] = useState<Team[]>([
    { id: "1", name: "Thunder Baseball", role: "Head Coach", memberCount: 28, isPrimary: true },
    { id: "2", name: "City Stars", role: "Assistant Coach", memberCount: 24, isPrimary: false },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Team & Access Management</h2>
            <p className="text-sm text-muted-foreground">View and manage your team memberships</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Request Access
          </Button>
        </div>

        <div className="space-y-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border ${
                team.isPrimary ? "border-primary/50 bg-primary/5" : "border-border bg-muted/30"
              }`}
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border border-border">
                  <AvatarImage
                    src={`/.jpg?height=48&width=48&query=${team.name} baseball logo`}
                    alt={team.name}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {team.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{team.name}</h3>
                    {team.isPrimary && (
                      <Badge variant="default" className="text-xs">
                        Primary
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      {team.role}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {team.memberCount} members
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:shrink-0">
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Team
                </Button>
                {!team.isPrimary && (
                  <Button variant="ghost" size="sm">
                    Set as Primary
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Switch Team Section */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-foreground">Looking for another team?</h3>
              <p className="text-sm text-muted-foreground">Request access to join a different team or organization</p>
            </div>
            <Button variant="outline">Browse Teams</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
