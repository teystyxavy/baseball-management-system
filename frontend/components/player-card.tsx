import { Button } from "@/components/ui/button";

export interface Player {
    id: number,
    name: string,
    position: string,
    number: number
    team: string,
    stats: {
        atBats: number,
        singles: number,
        doubles: number,
        triples: number,
        obp: number,
        avg: number,
        hr: number,
        rbi: number
    }
}

export function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">
            #{player.number}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{player.name}</h3>
            <p className="text-sm text-muted-foreground">{player.position}</p>
          </div>
        </div>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Team</span>
          <span className="text-foreground font-medium">{player.team}</span>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-4 mb-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">AT BATS</p>
            <p className="text-lg font-semibold text-accent">{player.stats.atBats}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Singles</p>
            <p className="text-lg font-semibold text-accent">{player.stats.singles}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Doubles</p>
            <p className="text-lg font-semibold text-accent">{player.stats.doubles}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Triples</p>
            <p className="text-lg font-semibold text-accent">{player.stats.triples}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">OBP</p>
            <p className="text-lg font-semibold text-accent">{player.stats.obp}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">HR</p>
            <p className="text-lg font-semibold text-accent">{player.stats.hr}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">RBI</p>
            <p className="text-lg font-semibold text-accent">{player.stats.rbi}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">AVG</p>
            <p className="text-lg font-semibold text-accent">{player.stats.avg}</p>
          </div>
        </div>
      </div>
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





