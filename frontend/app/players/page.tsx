"use client";

import {Navigation} from "@/components/navigation";
import {Button} from "@/components/ui/button";
import {PlayerCard, Player} from "@/components/player-card";
import {useEffect, useState} from "react";

// const samplePlayers = [
//   {
//     id: 1,
//     name: "John Smith",
//     position: "Pitcher",
//     number: 12,
//     team: "Thunder",
//     stats: {
//       avg: 0.321,
//       hr: 20,
//       rbi: 50,
//       atBats: 450,
//       singles: 110,
//       doubles: 18,
//       triples: 3,
//       obp: 0.360,
//     },
//   },
//   {
//     id: 2,
//     name: "Mike Johnson",
//     position: "Catcher",
//     number: 5,
//     team: "Thunder",
//     stats: {
//       avg: 0.312,
//       hr: 15,
//       rbi: 58,
//       atBats: 420,
//       singles: 95,
//       doubles: 18,
//       triples: 3,
//       obp: 0.345,
//     },
//   },
//   {
//     id: 3,
//     name: "David Brown",
//     position: "Outfield",
//     number: 7,
//     team: "Stars",
//     stats: {
//       avg: 0.298,
//       hr: 12,
//       rbi: 45,
//       atBats: 400,
//       singles: 85,
//       doubles: 15,
//       triples: 7,
//       obp: 0.335,
//     },
//   },
//   {
//     id: 4,
//     name: "Chris Lee",
//     position: "Infield",
//     number: 3,
//     team: "Thunder",
//     stats: {
//       avg: 0.275,
//       hr: 5,
//       rbi: 28,
//       atBats: 380,
//       singles: 78,
//       doubles: 16,
//       triples: 5,
//       obp: 0.315,
//     },
//   },
//   {
//     id: 5,
//     name: "Robert Wilson",
//     position: "Pitcher",
//     number: 22,
//     team: "Stars",
//     stats: {
//       avg: 0.0,
//       hr: 0,
//       rbi: 0,
//       atBats: 20,
//       singles: 0,
//       doubles: 0,
//       triples: 0,
//       obp: 0.000,
//     },
//   },
//   {
//     id: 6,
//     name: "James Garcia",
//     position: "Outfield",
//     number: 9,
//     team: "Giants",
//     stats: {
//       avg: 0.301,
//       hr: 18,
//       rbi: 62,
//       atBats: 460,
//       singles: 105,
//       doubles: 14,
//       triples: 11,
//       obp: 0.345,
//     },
//   },
// ];


function setPlayerData(jsonResponse) : Player[] {
  let players = [] as Player[];
  for (let i = 0; i < jsonResponse.length; i++) {
    players.push({
      id: jsonResponse[i].id,
      name: jsonResponse[i].name,
      position: jsonResponse[i].position,
      number: jsonResponse[i].number,
      team: jsonResponse[i].team,
      stats: {
        avg: (jsonResponse[i].num_singles + jsonResponse[i].num_doubles + jsonResponse[i].num_triples + jsonResponse[i].num_home_runs) / jsonResponse[i].num_at_bats,
        hr: jsonResponse[i].num_home_runs,
        rbi: jsonResponse[i].num_runs_brought_in,
        singles: jsonResponse[i].num_singles,
        doubles: jsonResponse[i].num_doubles,
        triples: jsonResponse[i].num_triples,
        atBats: jsonResponse[i].num_at_bats,
        obp: jsonResponse[i].num_on_bases / jsonResponse[i].num_at_bats,
      },
    });
  }
  return players;
}


export default function PlayersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setPosition] = useState("");
  const [selectedTeam, setTeams] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);

 useEffect(() => {
  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://localhost:8080/players');
      if (!response.ok) throw new Error('Failed to fetch players');
      const data = await response.json();
      setPlayers(setPlayerData(data));
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };
  
  fetchPlayers();
}, []);
  // filter players based on search term, will be replaced by call to backend
  const filteredPlayers = players.filter((player : Player) => {
    const playerSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = player.position.toLowerCase().includes(selectedPosition.toLowerCase());
    const matchesTeams = player.team.toLowerCase().includes(selectedTeam.toLowerCase());
    return matchesPosition && playerSearch && matchesTeams;
  });
    return (
        <>
            <Navigation/>
            <main className="bg-background min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <div>
                        <h1 className="text-4xl font-bold text-foreground mb-2">Players</h1>
                        <p className="text-muted-foreground">Manage and view all registered players</p>
                        </div>
                        <Button className="mt-4 md:mt-0">+ Add Player</Button>
                    </div>
                    {/*Search and Filter */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <input
                            type="text"
                            placeholder="Search players..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <select 
                          value={selectedPosition}
                          onChange={(e) => setPosition(e.target.value)}
                          className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                            <option value="">All Positions</option>
                            <option value="pitcher">Pitcher</option>
                            <option value="catcher">Catcher</option>
                            <option value="Infield">Infield</option>
                            <option value="outfield">Outfield</option>
                        </select>
                        <select
                          value={selectedTeam}
                          onChange={(e) => setTeams(e.target.value)}
                          className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                            <option value="">All Teams</option>
                            <option value="thunder">Thunder</option>
                            <option value="stars">Stars</option>
                            <option value="giants">Giants</option>
                        </select>
                    </div>

                    {/* Player Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPlayers.length > 0 ? (
                          filteredPlayers.map((player: Player) => (
                              <PlayerCard key={player.id} player={player} />
                          ))
                        ) : (
                              <div className="col-span-full text-center py-12">
                                    <p className="text-muted-foreground text-lg">No players found matching your filters.</p>
                              </div>
                            ) 
                        }
                    </div>
                </div>
            </main>
        </>
    )
}