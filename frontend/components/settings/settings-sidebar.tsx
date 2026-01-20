"use client"

import type React from "react"

import { User, SlidersHorizontal, Users, Bell, Shield, Database, ChevronRight } from "lucide-react"
import type { SettingsSection } from "@/app/settings/page"

interface SettingsSidebarProps {
  activeSection: SettingsSection
  onSectionChange: (section: SettingsSection) => void
}

const sidebarItems: { id: SettingsSection; label: string; icon: React.ElementType; description: string }[] = [
  { id: "profile", label: "Profile", icon: User, description: "Your personal information" },
  { id: "preferences", label: "Preferences", icon: SlidersHorizontal, description: "Baseball-specific settings" },
  { id: "team", label: "Team & Access", icon: Users, description: "Manage team memberships" },
  { id: "notifications", label: "Notifications", icon: Bell, description: "Alert preferences" },
  { id: "security", label: "Security", icon: Shield, description: "Password & authentication" },
  { id: "data", label: "Data & Privacy", icon: Database, description: "Export & visibility" },
]

export function SettingsSidebar({ activeSection, onSectionChange }: SettingsSidebarProps) {
  return (
    <aside className="lg:w-72 shrink-0">
      <nav className="bg-card rounded-xl border border-border p-2 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"   
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{item.label}</div>
                <div
                  className={`text-xs truncate ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                >
                  {item.description}
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? "opacity-100" : "opacity-0"}`} />
            </button>
          )
        })}
      </nav>

      {/* Baseball decorative element */}
      <div className="hidden lg:block mt-6 p-4 bg-card rounded-xl border border-border">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <span className="text-lg">⚾</span>
          </div>
          <div className="text-xs">
            <div className="font-medium text-foreground">Pro Tip</div>
            <div>Set your default stat view to see what matters most</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
