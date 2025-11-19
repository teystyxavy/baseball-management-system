package model

import (
	"gorm.io/gorm"
)

type Team struct {
	gorm.Model
	Name string `json:"name" gorm:"unique;not null"`
}