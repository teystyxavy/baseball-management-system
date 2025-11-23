package service

import (
	"backend/internal/db"
	"backend/internal/model"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllPlayers(c *gin.Context) (*gorm.DB, []model.Player) {
	gormDB := db.GetDB(c)

	var players []model.Player
	result := gormDB.Preload("Team").Find(&players)
	return result, players
}

func GetPlayerByID(id int, c *gin.Context) (*gorm.DB, model.Player) {
	gormDB := db.GetDB(c)
	var player model.Player
	result := gormDB.First(&player, id)
	return result, player
}

func CreatePlayer(newPlayer model.Player, c *gin.Context) (*gorm.DB, model.Player) {
	gormDB := db.GetDB(c)
	result := gormDB.Create(&newPlayer)
	return result, newPlayer
}

func DeletePlayerById(id int, c *gin.Context) (*gorm.DB, model.Player) {
	gormDB := db.GetDB(c)
	result := gormDB.Where("id = ?", id).Delete(&model.Player{})
	return result, model.Player{}
}

func UpdatePlayer(updatedPlayer model.Player, c *gin.Context) (*gorm.DB, model.Player) {
	gormDB := db.GetDB(c)
	result := gormDB.Save(&updatedPlayer)		
	return result, updatedPlayer
}

func CreatePlayers(players *[]model.Player, c *gin.Context) *gorm.DB{
	gormDB := db.GetDB(c)
	result := gormDB.Create(&players)
	return result
}