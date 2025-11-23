"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { TeamCard } from "@/components/team-card"
import { get } from "http"

const sampleTeams = [
  { id: 1, name: "Thunder", city: "New York", wins: 12, losses: 5, playerCount: 18, founded: 2018 },
  { id: 2, name: "Stars", city: "Los Angeles", wins: 10, losses: 7, playerCount: 16, founded: 2019 },
  { id: 3, name: "Giants", city: "San Francisco", wins: 14, losses: 3, playerCount: 20, founded: 2017 },
] 

export default function TeamsPage() {
    const [teams, setTeams] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getTeams = async () => {
            try {
                const response = await fetch("http://localhost:8080/teams")
                if (!response.ok) {
                    throw new Error("Failed to fetch teams")
                }
                const data = await response.json()
                setTeams(data)
            } catch (error) {
                setError(error.message)
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        getTeams()
    }, [])
    
  return (
    <>
      <Navigation />
      <main className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Teams</h1>
              <p className="text-muted-foreground">View and manage all teams</p>
            </div>
            <Button className="mt-4 md:mt-0">+ Create Team</Button>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Teams</p>
              <p className="text-3xl font-bold text-accent">{sampleTeams.length}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Players</p>
              <p className="text-3xl font-bold text-accent">{sampleTeams.reduce((sum, t) => sum + t.playerCount, 0)}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Games Won</p>
              <p className="text-3xl font-bold text-accent">{sampleTeams.reduce((sum, t) => sum + t.wins, 0)}</p>
            </div>
          </div>

          {/* Teams Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
