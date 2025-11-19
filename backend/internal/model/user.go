package model

import (
	"gorm.io/gorm"
)

type User struct {
    gorm.Model
    Name     string `json:"name" gorm:"unique;not null"`
    Email    string `json:"email" gorm:"unique;not null"`
    Password string `json:"password" gorm:"not null"`
    TeamID   int    `json:"team_id" gorm:"not null"`
    Team     Team   `gorm:"foreignKey:TeamID"`
    Player   Player `gorm:"foreignKey:UserID"`  // Player references User via UserID
}