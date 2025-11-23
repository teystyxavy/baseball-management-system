"use client";

import {Navigation} from "@/components/navigation";
import {Button} from "@/components/ui/button";
import {PlayerCard, Player} from "@/components/player-card";
import {useEffect, useState} from "react";

function transformPlayerData(apiData: any): Player {
  return {
    id: apiData.id,
    name: apiData.name,
    position: apiData.position,
    jerseyNumber: apiData.jersey_number,
    atBats: apiData.num_at_bats,
    singles: apiData.num_singles,
    doubles: apiData.num_doubles,
    triples: apiData.num_triples,
    obp: apiData.num_on_bases / apiData.num_at_bats,
    avg: apiData.num_at_bats > 0 
      ? (apiData.num_singles + apiData.num_doubles + apiData.num_triples + apiData.num_home_runs) / apiData.num_at_bats 
      : 0,
    hr: apiData.num_home_runs,
    rbi: apiData.num_runs_brought_in,
    teamName: apiData.team.name
  }
}

export default function PlayersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setPosition] = useState("");
  const [selectedLeague, setLeagues] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);

 useEffect(() => {
  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://localhost:8080/players');
      if (!response.ok) throw new Error('Failed to fetch players');
      const data = await response.json();
      const transformedPlayers = data.map(transformPlayerData);
      setPlayers(transformedPlayers);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };
  
  fetchPlayers();
}, []);

  const filteredPlayers = players.filter((player : Player) => {
    const playerSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) || player.teamName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = player.position.toLowerCase().includes(selectedPosition.toLowerCase());
    //const matchesLeague = player.teamName.toLowerCase().includes(selectedLeague.toLowerCase());
    return matchesPosition && playerSearch // && matchesTeams;
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
                            placeholder="Search players or teams..."
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
                            <option value="shortstop">Shortstop</option>
                            <option value="third base">Third Base</option>
                            <option value="first base">First Base</option>
                            <option value="second base">Second Base</option>
                            <option value="outfielder">Outfielder</option>
                        </select>
                        <select
                          value={selectedLeague}
                          onChange={(e) => setLeagues(e.target.value)}
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