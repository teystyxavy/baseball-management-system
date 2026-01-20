"use client"

import { useState } from "react"
import { Download, Eye, Trash2, FileJson, FileSpreadsheet, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DataPrivacySection() {
  const [visibility, setVisibility] = useState("team")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  return (
    <div className="space-y-6">
      {/* Data Export */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Download className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Data Export</h2>
            <p className="text-sm text-muted-foreground">Download your statistics and personal data</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <button className="flex items-center gap-4 p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors text-left">
            <div className="w-12 h-12 rounded-lg bg-green-600/10 flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <div className="font-medium text-foreground">Export as CSV</div>
              <div className="text-sm text-muted-foreground">Spreadsheet-compatible format</div>
            </div>
          </button>

          <button className="flex items-center gap-4 p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors text-left">
            <div className="w-12 h-12 rounded-lg bg-amber-600/10 flex items-center justify-center shrink-0">
              <FileJson className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <div className="font-medium text-foreground">Export as JSON</div>
              <div className="text-sm text-muted-foreground">Developer-friendly format</div>
            </div>
          </button>
        </div>
      </div>

      {/* Stat Visibility */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Eye className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Stat Visibility</h2>
              <p className="text-sm text-muted-foreground">Control who can see your statistics</p>
            </div>
          </div>
          <Select value={visibility} onValueChange={setVisibility}>
            <SelectTrigger className="w-full sm:w-48 bg-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private">Private (Only me)</SelectItem>
              <SelectItem value="team">Team Members</SelectItem>
              <SelectItem value="public">Public</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-muted/30 text-sm text-muted-foreground">
          {visibility === "private" && "Your stats are only visible to you."}
          {visibility === "team" && "Your stats are visible to all team members and coaches."}
          {visibility === "public" && "Your stats are visible to anyone with a link to your profile."}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card rounded-xl border border-destructive/30 p-6">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
            <Trash2 className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-destructive">Danger Zone</h2>
            <p className="text-sm text-muted-foreground">Irreversible and destructive actions</p>
          </div>
        </div>

        {!showDeleteConfirm ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-destructive/20 bg-destructive/5">
            <div>
              <div className="font-medium text-foreground">Delete Account</div>
              <div className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </div>
            </div>
            <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)} className="shrink-0">
              Delete Account
            </Button>
          </div>
        ) : (
          <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/10 space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-destructive">Are you absolutely sure?</div>
                <div className="text-sm text-muted-foreground mt-1">
                  This action cannot be undone. This will permanently delete your account, remove all your statistics,
                  and revoke your team memberships.
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="destructive">Yes, Delete My Account</Button>
              <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
