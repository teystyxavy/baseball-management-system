package service

import (
	"backend/internal/db"
	"backend/internal/model"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllUsers(c *gin.Context) (*gorm.DB, []model.User) {
	gormDB := db.GetDB(c)

	var players []model.User
	result := gormDB.Preload("Team").Preload("Player").Find(&players)
	return result, players
}

func GetUserByID(id int, c *gin.Context) (*gorm.DB, model.User) {
	gormDB := db.GetDB(c)
	var user model.User
	result := gormDB.Preload("Team").Preload("Player").First(&user, id)
	return result, user
}

func CreateUser(newUser model.User, c *gin.Context) (*gorm.DB, model.User) {
	gormDB := db.GetDB(c)
	result := gormDB.Create(&newUser)
	return result, newUser
}

func DeleteUserById(id int, c *gin.Context) (*gorm.DB, model.User) {
	gormDB := db.GetDB(c)
	result := gormDB.Where("id = ?", id).Delete(&model.User{})
	return result, model.User{}
}

func UpdateUser(updatedUser model.User, c *gin.Context) (*gorm.DB, model.User) {
	gormDB := db.GetDB(c)
	result := gormDB.Save(&updatedUser)
	return result, updatedUser
}

func GetUserByName(name string, c *gin.Context) (*gorm.DB, model.User) {
	gormDB := db.GetDB(c)
	var user model.User
	result := gormDB.Where("name = ?", name).Preload("Team").Preload("Player").First(&user)
	return result, user
}

