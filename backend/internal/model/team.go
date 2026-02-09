package model

import (
	"time"
)

type Team struct {
	ID int `json:"id" gorm:"primaryKey;autoIncrement"`
	Name string `json:"name" gorm:"unique;not null"`
	Wins int `json:"wins"`
	Losses int `json:"losses"`
	PlayerCount int `json:"player_count"`
	GamesPlayed int `json:"games_played"`
	Founded time.Time `json:"founded"`
}