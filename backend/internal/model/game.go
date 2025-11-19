package model

import (
	"gorm.io/gorm"
)

type Game struct {
	gorm.Model
	Team1ID int `json:"team_1_id" gorm:"not null;index"`
	Team1 Team `json:"team_1" gorm:"foreignKey:Team1ID;references:ID"`
	Team2ID int `json:"team_2_id" gorm:"not null;index"`
	Team2 Team`json:"team_2" gorm:"foreignKey:Team2ID;references:ID"`
	RunsScored1 int `json:"runs_scored_1"`
	RunsScored2 int `json:"runs_scored_2"`
}