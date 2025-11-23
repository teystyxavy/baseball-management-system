import { Button } from "@/components/ui/button"

interface Team {
  id: number
  name: string
  city: string
  wins: number
  losses: number
  playerCount: number
  founded: number
}

function getDate(date: number) {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function TeamCard({ team }: { team: Team }) {
  const winPercentage = ((team.wins / (team.wins + team.losses)) * 100).toFixed(1)

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors group">
      {/* Team Header */}
      <div className="mb-4">
        <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <span className="text-2xl font-bold text-primary-foreground">{team.name[0]}</span>
        </div>
        <h3 className="text-2xl font-bold text-foreground">{team.name}</h3>
        <p className="text-sm text-muted-foreground">{team.city}</p>
      </div>

      {/* Team Stats */}
      <div className="bg-muted rounded-lg p-4 mb-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Record</span>
          <span className="font-semibold text-foreground">
            {team.wins}W - {team.losses}L
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Win %</span>
          <span className="font-semibold text-accent">{winPercentage}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Players</span>
          <span className="font-semibold text-foreground">{team.playerCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Founded</span>
          <span className="font-semibold text-foreground">{getDate(team.founded)}</span>
        </div>
      </div>

      {/* Win Rate Bar */}
      <div className="mb-4">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-accent transition-all" style={{ width: `${winPercentage}%` }}></div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
          View
        </Button>
        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
          Edit
        </Button>
      </div>
    </div>
  )
}
