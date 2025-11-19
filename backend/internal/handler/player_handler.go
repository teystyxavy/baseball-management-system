package handler

import (
	"fmt"
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
	"backend/internal/model"
	"backend/internal/service"
	"backend/internal/consts"
)


	func GetPlayers(c *gin.Context){
		result, players := service.GetAllPlayers(c)
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

		result, player := service.GetPlayerByID(id, c)
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

		result, newPlayer := service.CreatePlayer(newPlayer, c)
		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusBadRequest)
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

		result, _ := service.DeletePlayerById(id, c)

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

		result, updatedPlayer := service.UpdatePlayer(updatedPlayer, c)

		if result.Error != nil {
			c.JSON(http.StatusNotFound, gin.H{"message": "album not found"})
		}
		c.IndentedJSON(http.StatusOK, updatedPlayer)
	}

	func UpdatePlayerAfterAtBat(atBat model.AtBat, c *gin.Context){
		getResult, originalPlayer := service.GetPlayerByID(atBat.PlayerID, c)

		if getResult.Error != nil {
			c.Error(getResult.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		originalPlayer.NumAtBats += 1
		originalPlayer.NumRunsBroughtIn += atBat.RunsBroughtIn

		switch atBat.TypeOfHit {
			case consts.SINGLE:
				originalPlayer.NumSingles += 1
			case consts.DOUBLE:
				originalPlayer.NumDoubles += 1
			case consts.TRIPLE:
				originalPlayer.NumTriples += 1
			case consts.HOMERUN:
				originalPlayer.NumHomeRuns += 1
			case consts.GROUNDOUT:
				originalPlayer.NumGroundOuts += 1
			case consts.STRIKEOUT:
				originalPlayer.NumStrikeouts += 1
			case consts.WALK, consts.INTENTIONAL_WALK:
				originalPlayer.NumWalks += 1
			case consts.FLYOUT:
				originalPlayer.NumFlyouts += 1
		}
		

		updateResult, updatedPlayer := service.UpdatePlayer(originalPlayer, c)

		if updateResult.Error != nil {
			c.Error(updateResult.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		c.IndentedJSON(http.StatusOK, gin.H{"message": fmt.Sprintf("player with id %d updated after at bat, new stats: %v", atBat.PlayerID, updatedPlayer)})
	}

	



