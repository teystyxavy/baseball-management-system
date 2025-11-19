package handler

import (
	"fmt"
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
	"backend/internal/model"
	"backend/internal/service"
)

func GetAtBats(c *gin.Context){	
	result, atBats := service.GetAllAtBats(c)
	if result.Error != nil {
		c.Error(result.Error)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	c.IndentedJSON(http.StatusOK, atBats)
}

func GetAtBatsByPlayerID(c *gin.Context){
	idStr := c.Query("player_id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		c.Error(err)
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	result, atBats := service.GetAtBatsByPlayerID(id, c)
	if result.Error != nil {
		c.Error(result.Error)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	c.IndentedJSON(http.StatusOK, atBats)
}

func GetAtBatsByPlayerIDAndGameID(c *gin.Context){
	playerIDStr := c.Param("player_id")
	gameIDStr := c.Param("game_id")

	playerID, playerErr := strconv.Atoi(playerIDStr)
	gameID, gameErr := strconv.Atoi(gameIDStr)

	if playerErr != nil {
		c.Error(playerErr)
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	if gameErr != nil {
		c.Error(gameErr)
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	result, atBats := service.GetAtBatsByPlayerIdAndGameId(playerID, gameID, c)
	if result.Error != nil {
		c.Error(result.Error)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	c.IndentedJSON(http.StatusOK, atBats)
}

func GetAtBatByID(c *gin.Context){
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		c.Error(err)
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	result, atBat := service.GetAtBatByID(id, c)
	if result.Error != nil {
		c.Error(result.Error)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.IndentedJSON(http.StatusOK, atBat)
}

func CreateAtBat(c *gin.Context){
	var newAtBat model.AtBat

	// bind received JSON body to newAlbum
	if err := c.BindJSON(&newAtBat); err != nil {
		c.Error(err)
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	result, newAtBat := service.CreateAtBat(newAtBat, c)
	if result.Error != nil {
		c.Error(result.Error)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.IndentedJSON(http.StatusCreated, newAtBat)

	UpdatePlayerAfterAtBat(newAtBat, c)
}

func DeleteAtBatById(c *gin.Context){
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)

	if err != nil {
		c.Error(err)
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	result, _ := service.DeleteAtBatById(id, c)

	if result.Error != nil {
		c.Error(result.Error)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	c.IndentedJSON(http.StatusOK, gin.H{"message": fmt.Sprintf("atBat with id %d deleted", id)})
}

func UpdateAtBat(c *gin.Context){
	var updatedAtBat model.AtBat

	if err := c.ShouldBindJSON(&updatedAtBat); err != nil {
		c.Error(err)
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	result, updatedAtBat := service.UpdateAtBatById(updatedAtBat, c)

	if result.Error != nil {
		c.Error(result.Error)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.IndentedJSON(http.StatusOK, updatedAtBat)
}