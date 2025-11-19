package service

import (
	"backend/internal/db"
	"backend/internal/model"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllGames(c *gin.Context) (*gorm.DB, []model.Game) {
	gormDB := db.GetDB(c)

	var games []model.Game
	result := gormDB.Preload("Team1").Preload("Team2").Find(&games)	
	return result, games
}

func GetGameByID(id int, c *gin.Context) (*gorm.DB, model.Game) {
	gormDB := db.GetDB(c)
	var game model.Game
	result := gormDB.First(&game, id)
	return result, game
}

func CreateGame(newGame model.Game, c *gin.Context) (*gorm.DB, model.Game) {
	gormDB := db.GetDB(c)
	result := gormDB.Preload("Team1").Preload("Team2").Create(&newGame)
	return result, newGame
}

func DeleteGameById(id int, c *gin.Context) (*gorm.DB, model.Game) {
	gormDB := db.GetDB(c)
	result := gormDB.Preload("Team1").Preload("Team2").Where("id = ?", id).Delete(&model.Game{})
	return result, model.Game{}
}

func UpdateGameById(updatedGame model.Game, c *gin.Context) (*gorm.DB, model.Game) {
	gormDB := db.GetDB(c)		
	result := gormDB.Preload("Team1").Preload("Team2").Save(&updatedGame)
	return result, updatedGame
}

func GetGameByTeamID(teamID int, c *gin.Context) (*gorm.DB, []model.Game) {
	gormDB := db.GetDB(c)
	var games []model.Game
	result := gormDB.Preload("Team1").Preload("Team2").Where("team_1_id = ? OR team_2_id = ?", teamID, teamID).Find(&games)	
	return result, games
}