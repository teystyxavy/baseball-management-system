package dto

type AtBatDTO struct {
	PlayerID int `json:"player_id"`
	GameID int `json:"game_id"`
	NumAtBats int `json:"num_at_bats"`
	SafeHit bool `json:"safe_hit"`
	TypeOfHit string `json:"type_of_hit"`
	RunsBroughtIn int `json:"runs_brought_in"`
}