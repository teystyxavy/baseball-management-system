import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { GameCard, GameStatus} from "@/components/game-card"

const sampleGames = [
  {
    id: 1,
    homeTeam: "Thunder",
    awayTeam: "Stars",
    homeScore: 5,
    awayScore: 3,
    date: "2025-03-10",
    time: "19:00",
    status: GameStatus.COMPLETED,
  },
  {
    id: 2,
    homeTeam: "Giants",
    awayTeam: "Thunder",
    homeScore: 2,
    awayScore: 2,
    date: "2025-03-11",
    time: "20:00",
    status: GameStatus.LIVE,
  },
  {
    id: 3,
    homeTeam: "Stars",
    awayTeam: "Giants",
    homeScore: 0,
    awayScore: 0,
    date: "2025-03-15",
    time: "18:30",
    status: GameStatus.SCHEDULED,
  },
  {
    id: 4,
    homeTeam: "Thunder",
    awayTeam: "Giants",
    homeScore: 7,
    awayScore: 4,
    date: "2025-03-05",
    time: "17:00",
    status: GameStatus.COMPLETED,
  },
  {
    id: 5,
    homeTeam: "Stars",
    awayTeam: "Thunder",
    homeScore: 1,
    awayScore: 0,
    date: "2025-03-20",
    time: "19:30",
    status: GameStatus.SCHEDULED,
  },
  {
    id: 6,
    homeTeam: "Giants",
    awayTeam: "Stars",
    homeScore: 3,
    awayScore: 6,
    date: "2025-03-09",
    time: "14:00",
    status: GameStatus.COMPLETED,
  },
  {
    id: 7,
    homeTeam: "Thunder",
    awayTeam: "Giants",
    homeScore: 4,
    awayScore: 5,
    date: "2025-03-12",
    time: "20:30",
    status: GameStatus.SCHEDULED,
  },
  {
    id: 8,
    homeTeam: "Stars",
    awayTeam: "Giants",
    homeScore: 3,
    awayScore: 3,
    date: "2025-03-11",
    time: "21:00",
    status: GameStatus.LIVE,
  },
];


export default function GamesPage() {
  return (
    <>
      <Navigation/>
      <main className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">Games</h1>
                    <p className="text-muted-foreground">Schedule and manage upcoming Games</p>
                </div>
                <Button className="mt-4 md:mt-0">Schedule Game</Button>
            </div>
            {/* Search and Filter Section */}
            <div className="flex flex-wrap gap-2 mb-8">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium transition-colors">All</button>
                <button className="px-4 py-2 bg-card text-foreground rounded-lg font-medium transition-colors">Scheduled</button>
                <button className="px-4 py-2 bg-card text-foreground rounded-lg font-medium transition-colors">Live</button>
                <button className="px-4 py-2 bg-card text-foreground rounded-lg font-medium transition-colors">Completed</button>
            </div>
            {/* Games List */}
            <div className="spacey-y-4">
                {sampleGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    
      </main>
    </>
    )
}