package model

import (
	"gorm.io/gorm"
)

type Team struct {
	gorm.Model
	Name string `json:"name" gorm:"unique;not null"`
	Players []Player `json:"players" gorm:"many2many:team_players"`
	GamesPlayed []Game `json:"games_played" gorm:"many2many:team_games"`
}