package handler


import (
	"fmt"
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
	"backend/internal/model"
	"backend/internal/service"
)


	func GetTeams(c *gin.Context){
		result, teams := service.GetAllTeams(c)
		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		c.IndentedJSON(http.StatusOK, teams)
	}

	func GetTeamByID(c *gin.Context){
		idStr := c.Param("id")
		id, err := strconv.Atoi(idStr)

		if err != nil {
			c.Error(err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		result, team := service.GetTeamByID(id, c)
		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		c.IndentedJSON(http.StatusOK, team)
	}

	func CreateTeam(c *gin.Context){
		var newTeam model.Team

		// bind received JSON body to newAlbum
		if err := c.BindJSON(&newTeam); err != nil {
			c.Error(err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		result, newTeam := service.CreateTeam(newTeam, c)
		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		c.IndentedJSON(http.StatusCreated, newTeam)
	}

	func DeleteTeamById(c *gin.Context){
		idStr := c.Param("id")

		id, err := strconv.Atoi(idStr)

		if err != nil {
			c.Error(err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		result, _ := service.DeleteTeamById(id, c)

		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		c.IndentedJSON(http.StatusOK, gin.H{"message": fmt.Sprintf("team with id %d deleted", id)})
	}

	func UpdateTeam(c *gin.Context){
		var updatedTeam model.Team

		if err := c.ShouldBindJSON(&updatedTeam); err != nil {
			c.Error(err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
		result, updatedTeam := service.UpdateTeam(updatedTeam, c)

		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		c.IndentedJSON(http.StatusOK, updatedTeam)
	}





