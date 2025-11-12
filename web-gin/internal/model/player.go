package model	

import (
	"gorm.io/gorm"
)

type Player struct {
	gorm.Model
	Name string `json:"name" gorm:"unique;not null"`
	TeamID int `json:"team_id" gorm:"not null"`
	GamesPlayed int `json:"games_played"`
	BattingAverage float64 `json:"batting_average"`
	OnBasePercentage float64 `json:"on_base_percentage"`
}