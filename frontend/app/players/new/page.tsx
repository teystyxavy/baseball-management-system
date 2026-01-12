'use client';

import { useState } from 'react';

export default function AddPlayer() {
  const [formData, setFormData] = useState({
    playerNumber: '',
    playerName: '',
    position: 'Pitcher',
    team: '',
    atBats: '',
    singles: '',
    doubles: '',
    triples: '',
    obp: '',
    hr: '',
    rbi: '',
    avg: ''
  });

  const positions = [
    'Pitcher',
    'Catcher',
    'First Base',
    'Second Base',
    'Third Base',
    'Shortstop',
    'Left Field',
    'Center Field',
    'Right Field',
    'Designated Hitter'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('authToken='))?.split('=')[1];
      if (!token) {
        alert("You must be logged in to add a player.");
        return;
      } 
      const response = await fetch('http://localhost:8080/api/player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include', // Include cookies in request
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('HTTP error! Status:' + response.status);
      const data = await response.json();
      console.log("Player added successfully:", data);
      // Reset form after successful submission
      setFormData({
        playerNumber: '',
        playerName: '',
        position: 'Pitcher',
        team: '',
        atBats: '',
        singles: '',
        doubles: '',
        triples: '',
        obp: '',
        hr: '',
        rbi: '',
        avg: ''
      });
    } catch (error) {
      console.error('Error adding player:', error);
      alert("Failed to add player. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="bg-black border-b border-zinc-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⚾</span>
              </div>
              <span className="text-xl font-bold">Baseball Manager</span>
            </div>
            <div className="flex items-center gap-2">
              <a href="#" className="px-4 py-2 text-gray-400 hover:text-white transition-colors">Home</a>
              <a href="#" className="px-4 py-2 bg-blue-600 rounded-lg text-white font-medium">Players</a>
              <a href="#" className="px-4 py-2 text-gray-400 hover:text-white transition-colors">Games</a>
              <a href="#" className="px-4 py-2 text-gray-400 hover:text-white transition-colors">Teams</a>
              <a href="#" className="px-4 py-2 text-gray-400 hover:text-white transition-colors">Profile</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2 text-white hover:text-gray-300 transition-colors font-medium">
              Login
            </button>
            <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-3">Add Player</h1>
          <p className="text-gray-400 text-lg">
            Enter player statistics and information
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Player Info Section */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6 text-white">Player Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Player Number */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Player Number
                </label>
                <input
                  type="text"
                  name="playerNumber"
                  value={formData.playerNumber}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="12"
                  required
                />
              </div>

              {/* Player Name */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Player Name
                </label>
                <input
                  type="text"
                  name="playerName"
                  value={formData.playerName}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="John Smith"
                  required
                />
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Position
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:border-blue-600 focus:outline-none transition-colors cursor-pointer"
                  required
                >
                  {positions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>

              {/* Team */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Team
                </label>
                <input
                  type="text"
                  name="team"
                  value={formData.team}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="Thunder"
                  required
                />
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6 text-white">Batting Statistics</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* At Bats */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  At Bats
                </label>
                <input
                  type="number"
                  name="atBats"
                  value={formData.atBats}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="80"
                  required
                />
              </div>

              {/* Singles */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Singles
                </label>
                <input
                  type="number"
                  name="singles"
                  value={formData.singles}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="20"
                  required
                />
              </div>

              {/* Doubles */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Doubles
                </label>
                <input
                  type="number"
                  name="doubles"
                  value={formData.doubles}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="6"
                  required
                />
              </div>

              {/* Triples */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Triples
                </label>
                <input
                  type="number"
                  name="triples"
                  value={formData.triples}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="1"
                  required
                />
              </div>

              {/* OBP */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  OBP
                </label>
                <input
                  type="text"
                  name="obp"
                  value={formData.obp}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="0.438"
                  required
                />
              </div>

              {/* HR */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  HR (Home Runs)
                </label>
                <input
                  type="number"
                  name="hr"
                  value={formData.hr}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="8"
                  required
                />
              </div>

              {/* RBI */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  RBI
                </label>
                <input
                  type="number"
                  name="rbi"
                  value={formData.rbi}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="32"
                  required
                />
              </div>

              {/* AVG */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  AVG (Average)
                </label>
                <input
                  type="text"
                  name="avg"
                  value={formData.avg}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="0.285"
                  required
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-8 rounded-lg transition-colors"
            >
              Add Player
            </button>
            <button
              type="button"
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3.5 px-8 rounded-lg transition-colors border border-zinc-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}