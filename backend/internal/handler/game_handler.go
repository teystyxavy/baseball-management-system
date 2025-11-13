package handler

import (
	"fmt"
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
	"backend/internal/model"
	"backend/internal/db"
)


	func GetGame(c *gin.Context){
		db := db.GetDB(c)

		var games []model.Game
		result := db.Find(&games)
		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		c.IndentedJSON(http.StatusOK, games)
	}

	func GetGameByID(c *gin.Context){
		idStr := c.Param("id")
		id, err := strconv.Atoi(idStr)

		if err != nil {
			c.Error(err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		db := db.GetDB(c)

		var game model.Game
		result := db.First(&game, id)
		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		c.IndentedJSON(http.StatusOK, game)
	}

	func CreateGame(c *gin.Context){
		var newGame model.Game

		// bind received JSON body to newAlbum
		if err := c.BindJSON(&newGame); err != nil {
			c.Error(err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		db := db.GetDB(c)
		result := db.Create(&newGame)
		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		c.IndentedJSON(http.StatusCreated, newGame)
	}

	func DeleteGameById(c *gin.Context){
		idStr := c.Param("id")

		id, err := strconv.Atoi(idStr)

		if err != nil {
			c.Error(err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		db := db.GetDB(c)
		result := db.Where("id = ?", id).Delete(&model.Game{})

		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		c.IndentedJSON(http.StatusOK, gin.H{"message": fmt.Sprintf("player with id %d deleted", id)})
	}

	func UpdateGameById(c *gin.Context){
		var updatedGame model.Game

		if err := c.ShouldBindJSON(&updatedGame); err != nil {
			c.Error(err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		db := db.GetDB(c)
		result := db.Save(&updatedGame)

		if result.Error != nil {
			c.JSON(http.StatusNotFound, gin.H{"message": "album not found"})
		}
	}

