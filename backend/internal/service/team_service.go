package service

import (
	"backend/internal/db"
	"backend/internal/model"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllTeams(c *gin.Context) (*gorm.DB, []model.Team){
	db := db.GetDB(c)
	var teams []model.Team
	result := db.Find(&teams)
	return result, teams
}

func GetTeamByID(id int, c *gin.Context) (*gorm.DB, model.Team){
	db := db.GetDB(c)
	var team model.Team
	result := db.First(&team, id)
	return result, team
}

func CreateTeam(newTeam model.Team, c *gin.Context) (*gorm.DB, model.Team){
	db := db.GetDB(c)
	result := db.Create(&newTeam)
	return result, newTeam
}

func DeleteTeamById(id int, c *gin.Context) (*gorm.DB, model.Team){
	db := db.GetDB(c)
	result := db.Where("id = ?", id).Delete(&model.Team{})
	return result, model.Team{}
}

func UpdateTeam(updatedTeam model.Team, c *gin.Context) (*gorm.DB, model.Team){
	db := db.GetDB(c)
	result := db.Save(&updatedTeam)
	return result, updatedTeam
}