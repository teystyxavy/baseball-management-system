package handler


import (
	"fmt"
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
	"web-gin/internal/model"
	"web-gin/internal/db"
)


	func GetTeams(c *gin.Context){
		db := db.GetDB(c)

		var teams []model.Team
		result := db.Find(&teams)
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

		db := db.GetDB(c)

		var team model.Team
		result := db.First(&team, id)
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

		db := db.GetDB(c)
		result := db.Create(&newTeam)
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

		db := db.GetDB(c)
		result := db.Where("id = ?", id).Delete(&model.Team{})

		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		c.IndentedJSON(http.StatusOK, gin.H{"message": fmt.Sprintf("team with id %d deleted", id)})
	}

	func UpdateTeamById(c *gin.Context){
		var updatedTeam model.Team

		if err := c.ShouldBindJSON(&updatedTeam); err != nil {
			c.Error(err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		db := db.GetDB(c)
		result := db.Save(&updatedTeam)

		if result.Error != nil {
			c.JSON(http.StatusNotFound, gin.H{"message": "album not found"})
		}
	}





