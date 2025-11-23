package model

import (
	"gorm.io/gorm"
)

type Role string


type User struct {
    gorm.Model
    Name     string `json:"name" gorm:"unique;not null"`
    Email    string `json:"email" gorm:"unique;not null"`
    Password string `json:"password" gorm:"not null"`
    IsAdmin  bool   `json:"is_admin" gorm:"default:false"`
    IsManager bool   `json:"is_manager" gorm:"default:false"`
}
