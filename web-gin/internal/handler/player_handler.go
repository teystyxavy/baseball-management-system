package handler

import (
	"fmt"
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
	"web-gin/internal/model"
	"web-gin/internal/db"
)


	func GetPlayers(c *gin.Context){
		db := db.GetDB(c)

		var players []model.Player
		result := db.Find(&players)
		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		c.IndentedJSON(http.StatusOK, players)
	}

	func GetPlayerByID(c *gin.Context){
		idStr := c.Param("id")
		id, err := strconv.Atoi(idStr)

		if err != nil {
			c.Error(err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		db := db.GetDB(c)

		var player model.Player
		result := db.First(&player, id)
		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		c.IndentedJSON(http.StatusOK, player)
	}

	func CreatePlayer(c *gin.Context){
		var newPlayer model.Player

		// bind received JSON body to newAlbum
		if err := c.BindJSON(&newPlayer); err != nil {
			c.Error(err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		db := db.GetDB(c)
		result := db.Create(&newPlayer)
		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		c.IndentedJSON(http.StatusCreated, newPlayer)
	}

	func DeletePlayerById(c *gin.Context){
		idStr := c.Param("id")

		id, err := strconv.Atoi(idStr)

		if err != nil {
			c.Error(err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		db := db.GetDB(c)
		result := db.Where("id = ?", id).Delete(&model.Player{})

		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		c.IndentedJSON(http.StatusOK, gin.H{"message": fmt.Sprintf("player with id %d deleted", id)})
	}

	func UpdatePlayerById(c *gin.Context){
		var updatedPlayer model.Player

		if err := c.ShouldBindJSON(&updatedPlayer); err != nil {
			c.Error(err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		db := db.GetDB(c)
		result := db.Save(&updatedPlayer)

		if result.Error != nil {
			c.JSON(http.StatusNotFound, gin.H{"message": "album not found"})
		}
	}



