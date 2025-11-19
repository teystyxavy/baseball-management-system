package service

import (
	"backend/internal/db"
	"backend/internal/model"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllAtBats(c *gin.Context) (*gorm.DB, []model.Game) {
	gormDB := db.GetDB(c)
	var atBats []model.Game
	result := gormDB.Find(&atBats)
	return result, atBats
}

func GetAtBatByID(id int, c *gin.Context) (*gorm.DB, model.AtBat) {
	gormDB := db.GetDB(c)
	var atBat model.AtBat
	result := gormDB.First(&atBat, id)
	return result, atBat
}

func CreateAtBat(newAtBat model.AtBat, c *gin.Context) (*gorm.DB, model.AtBat) {
	gormDB := db.GetDB(c)
	result := gormDB.Create(&newAtBat)
	return result, newAtBat
}

func DeleteAtBatById(id int, c *gin.Context) (*gorm.DB, model.AtBat) {
	gormDB := db.GetDB(c)
	result := gormDB.Where("id = ?", id).Delete(&model.AtBat{})
	return result, model.AtBat{}
}

func UpdateAtBatById(updatedAtBat model.AtBat, c *gin.Context) (*gorm.DB, model.AtBat) {
	gormDB := db.GetDB(c)
	result := gormDB.Save(&updatedAtBat)
	return result, updatedAtBat
}

func GetAtBatsByPlayerID(playerID int, c *gin.Context) (*gorm.DB, []model.AtBat) {
	gormDB := db.GetDB(c)
	var atBats []model.AtBat
	result := gormDB.Where("player_id = ?", playerID).Find(&atBats)
	return result, atBats
}

func GetAtBatsByPlayerIdAndGameId(playerID int, gameID int, c *gin.Context) (*gorm.DB, []model.AtBat) {
	gormDB := db.GetDB(c)
	var atBats []model.AtBat
	result := gormDB.Where("player_id = ? AND game_id = ?", playerID, gameID).Find(&atBats)
	return result, atBats
}

