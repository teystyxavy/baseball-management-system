package model

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name string `json:"name" gorm:"unique;not null"`
	Email string `json:"email" gorm:"unique;not null"`
	Password string `json:"password" gorm:"not null"`
}