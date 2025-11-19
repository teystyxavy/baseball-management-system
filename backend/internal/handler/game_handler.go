package handler

import (
	"fmt"
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
	"backend/internal/model"
	"backend/internal/service"
)


	func GetAllGames(c *gin.Context){
		result, games := service.GetAllGames(c)
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

		result, game := service.GetGameByID(id, c)

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

		result, newGame := service.CreateGame(newGame, c)

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

		result, _ := service.GetGameByID(id, c)

		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		c.IndentedJSON(http.StatusOK, gin.H{"message": fmt.Sprintf("game with id %d deleted", id)})
	}

	func UpdateGameById(c *gin.Context){
		var updatedGame model.Game

		if err := c.ShouldBindJSON(&updatedGame); err != nil {
			c.Error(err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		result, updatedGame := service.UpdateGameById(updatedGame, c)

		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		c.IndentedJSON(http.StatusOK, updatedGame)
	}

