"use client"

import { useState } from "react"
import { Calendar, BarChart3, Ruler, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function PreferencesSection() {
  const [preferences, setPreferences] = useState({
    defaultSeason: "2024",
    statView: "batting",
    useMetric: false,
    defaultDashboard: "team-overview",
  })

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Baseball Preferences</h2>
            <p className="text-sm text-muted-foreground">Customize your analytics experience</p>
          </div>
          <Button>Save Preferences</Button>
        </div>

        <div className="space-y-6">
          {/* Default Season */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <Label className="text-base font-medium">Default Season</Label>
                <p className="text-sm text-muted-foreground">Choose which season to display by default</p>
              </div>
            </div>
            <Select
              value={preferences.defaultSeason}
              onValueChange={(value) => setPreferences({ ...preferences, defaultSeason: value })}
            >
              <SelectTrigger className="w-full sm:w-40 bg-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024 Season</SelectItem>
                <SelectItem value="2023">2023 Season</SelectItem>
                <SelectItem value="2022">2022 Season</SelectItem>
                <SelectItem value="2021">2021 Season</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Stat View */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <Label className="text-base font-medium">Preferred Stat View</Label>
                <p className="text-sm text-muted-foreground">Default statistics category to display</p>
              </div>
            </div>
            <Select
              value={preferences.statView}
              onValueChange={(value) => setPreferences({ ...preferences, statView: value })}
            >
              <SelectTrigger className="w-full sm:w-48 bg-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="batting">Batting Stats</SelectItem>
                <SelectItem value="pitching">Pitching Stats</SelectItem>
                <SelectItem value="fielding">Fielding Stats</SelectItem>
                <SelectItem value="advanced">Advanced Analytics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Metric System Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Ruler className="w-5 h-5 text-primary" />
              </div>
              <div>
                <Label className="text-base font-medium">Measurement Units</Label>
                <p className="text-sm text-muted-foreground">
                  {preferences.useMetric ? "Using metric system (km/h, m)" : "Using imperial system (mph, ft)"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm ${!preferences.useMetric ? "text-foreground" : "text-muted-foreground"}`}>
                Imperial
              </span>
              <Switch
                checked={preferences.useMetric}
                onCheckedChange={(checked) => setPreferences({ ...preferences, useMetric: checked })}
              />
              <span className={`text-sm ${preferences.useMetric ? "text-foreground" : "text-muted-foreground"}`}>
                Metric
              </span>
            </div>
          </div>

          {/* Default Dashboard */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <LayoutDashboard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <Label className="text-base font-medium">Default Dashboard</Label>
                <p className="text-sm text-muted-foreground">Which view to show when you log in</p>
              </div>
            </div>
            <Select
              value={preferences.defaultDashboard}
              onValueChange={(value) => setPreferences({ ...preferences, defaultDashboard: value })}
            >
              <SelectTrigger className="w-full sm:w-48 bg-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="team-overview">Team Overview</SelectItem>
                <SelectItem value="player-stats">Player Stats</SelectItem>
                <SelectItem value="game-logs">Game Logs</SelectItem>
                <SelectItem value="analytics">Analytics Dashboard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
