"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { SettingsSidebar } from "@/components/settings/settings-sidebar"
import { ProfileSection } from "@/components/settings/profile-section"
import { PreferencesSection } from "@/components/settings/preferences-section"
import { TeamAccessSection } from "@/components/settings/team-access-section"
import { NotificationsSection } from "@/components/settings/notifications-section"
import { SecuritySection } from "@/components/settings/security-section"
import { DataPrivacySection } from "@/components/settings/data-privacy-section"

export type SettingsSection = "profile" | "preferences" | "team" | "notifications" | "security" | "data"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile")

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />
      case "preferences":
        return <PreferencesSection />
      case "team":
        return <TeamAccessSection />
      case "notifications":
        return <NotificationsSection />
      case "security":
        return <SecuritySection />
      case "data":
        return <DataPrivacySection />
      default:
        return <ProfileSection />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <SettingsSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

          <main className="flex-1 min-w-0">{renderSection()}</main>
        </div>
      </div>
    </div>
  )
}
