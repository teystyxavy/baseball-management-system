package model

import (
	"gorm.io/gorm"
)

type Manager struct {
	gorm.Model
	UserID int `json:"user_id" gorm:"not null"`
	User User  `gorm:"foreignKey:UserID"`
	NumGamesManaged int `json:"num_games_managed"`
}