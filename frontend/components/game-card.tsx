import { Button } from "@/components/ui/button"
 

export enum GameStatus {
  SCHEDULED = "scheduled",
  LIVE = "live",
  COMPLETED = "completed"
}

interface Game {
  id: number
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  date: string
  time: string
  status: GameStatus
}

export function GameCard({ game }: { game: Game }) {
  const statusColors = {
    "scheduled": "bg-muted text-muted-foreground",
    "live": "bg-primary text-primary-foreground",
    "completed": "bg-card text-foreground",
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Date and Time */}
        <div className="md:w-24">
          <p className="text-sm text-muted-foreground">{formatDate(game.date)}</p>
          <p className="text-lg font-semibold text-foreground">{game.time}</p>
        </div>

        {/* Team Matchup */}
        <div className="flex-1 flex items-center gap-4 md:gap-8">
          {/* Home Team */}
          <div className="text-center flex-1 md:flex-none md:w-32">
            <p className="text-sm text-muted-foreground mb-1">Home</p>
            <h3 className="text-lg font-semibold text-foreground">{game.homeTeam}</h3>
          </div>

          {/* Score */}
          <div className="text-center">
            {game.status === GameStatus.SCHEDULED ? (
              <p className="text-sm text-muted-foreground">vs</p>
            ) : (
              <>
                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="text-3xl font-bold text-foreground">{game.homeScore}</span>
                  <span className="text-muted-foreground">-</span>
                  <span className="text-3xl font-bold text-foreground">{game.awayScore}</span>
                </div>
              </>
            )}
          </div>

          {/* Away Team */}
          <div className="text-center flex-1 md:flex-none md:w-32">
            <p className="text-sm text-muted-foreground mb-1">Away</p>
            <h3 className="text-lg font-semibold text-foreground">{game.awayTeam}</h3>
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[game.status]}`}>
            {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
          </span>
          <Button variant="outline" size="sm">
            View
          </Button>
        </div>
      </div>
    </div>
  )
}
