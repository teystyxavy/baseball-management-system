package model	

import (
    "gorm.io/gorm"
)
type Player struct {
    gorm.Model
    Name          string `json:"name" gorm:"not null"`
    JerseyNumber   int `json:"jersey_number"`
    Position       string `json:"position"`
    NumGamesPlayed int `json:"num_games_played"`
    NumAtBats      int `json:"num_at_bats"`
    NumSingles     int `json:"num_singles"`
    NumOnBases     int `json:"num_on_bases"`
    NumWalks       int `json:"num_walks"`
    NumStrikeouts  int `json:"num_strikeouts"`
    NumHomeRuns    int `json:"num_home_runs"`
    NumDoubles     int `json:"num_doubles"`
    NumTriples     int `json:"num_triples"`
    NumGroundOuts  int `json:"num_ground_outs"`
    NumFlyouts     int `json:"num_flyouts"`
    NumRunsBroughtIn int `json:"num_runs_brought_in"`
    TeamID         int `json:"team_id" gorm:"not null"`
    Team           Team `json:"team" gorm:"foreignKey:TeamID"`
}