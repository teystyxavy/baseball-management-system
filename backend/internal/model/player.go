package model	


type Player struct {
    UserID         int `json:"user_id" gorm:"primaryKey;unique;not null"` // Foreign key to User, unique ensures 1-to-1
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
}