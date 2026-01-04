import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { User } from "lucide-react";


export interface Player {
    image?: string | null,
    id: number,
    name: string,
    position: string,
    jerseyNumber: number
    atBats: number,
    singles: number,
    doubles: number,
    triples: number,
    obp: number,
    avg: number,
    hr: number,
    rbi: number
    teamName: string,
}


export function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center">
            <ImageWithFallback
              src={player.image || "/placeholder.svg"}
              alt={player.name}
              width={48}
              height={48}
              className="object-cover"
              fallback={<User className="w-6 h-6 text-muted-foreground" />}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{player.name}</h3>
            <p className="text-sm text-muted-foreground">#{player.jerseyNumber} {player.position}</p>
          </div>
        </div>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Team</span>
          <span className="text-foreground font-medium">{player.teamName}</span>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-4 mb-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">At Bats</p>
            <p className="text-lg font-semibold text-accent">{player.atBats}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Singles</p>
            <p className="text-lg font-semibold text-accent">{player.singles}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Doubles</p>
            <p className="text-lg font-semibold text-accent">{player.doubles}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Triples</p>
            <p className="text-lg font-semibold text-accent">{player.triples}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">OBP</p>
            <p className="text-lg font-semibold text-accent">{player.obp.toFixed(3)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">HR</p>
            <p className="text-lg font-semibold text-accent">{player.hr}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">RBI</p>
            <p className="text-lg font-semibold text-accent">{player.rbi}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">AVG</p>
            <p className="text-lg font-semibold text-accent">{player.avg.toFixed(3)}</p>
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





