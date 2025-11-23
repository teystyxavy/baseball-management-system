package handler

import (
	"fmt"
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
	"backend/internal/model"
	"backend/internal/service"
	"errors"
	"strings"
)


	func isValidEmail(email string) bool {
		return strings.Contains(email, "@")
	}


	func GetUsers(c *gin.Context){
		result, users := service.GetAllUsers(c)
		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		c.IndentedJSON(http.StatusOK, users)
	}
	

	func GetUserByID(c *gin.Context){
		idStr := c.Param("id")
		id, err := strconv.Atoi(idStr)

		if err != nil {
			c.Error(err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		result, user := service.GetUserByID(id, c)

		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		c.IndentedJSON(http.StatusOK, user)
	}

	func GetUserByEmail(c *gin.Context){
		email := c.Query("email")

		if !isValidEmail(email) {
			c.Error(errors.New("email is not valid"))
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		result, user := service.GetUserByEmail(email, c)

		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		c.IndentedJSON(http.StatusOK, user)
	}

	func CreateUser(c *gin.Context){
		var newUser model.User

		// bind received JSON body to newAlbum
		if err := c.BindJSON(&newUser); err != nil {
			c.Error(err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
		result, returnUser := service.CreateUser(newUser, c)

		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusBadRequest)
		}
		c.IndentedJSON(http.StatusCreated, returnUser)
	}

	func DeleteUserById(c *gin.Context){
		idStr := c.Param("id")

		id, err := strconv.Atoi(idStr)

		if err != nil {
			c.Error(err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		result, _ := service.DeleteUserById(id, c)

		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		c.IndentedJSON(http.StatusOK, gin.H{"message": fmt.Sprintf("user with id %d deleted", id)})
	}

	func UpdateUser(c *gin.Context){
		var updatedUser model.User

		if err := c.ShouldBindJSON(&updatedUser); err != nil {
			c.Error(err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		result, updatedUser := service.UpdateUser(updatedUser, c)

		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		c.IndentedJSON(http.StatusOK, updatedUser)
	}

	func GetUserByName(c *gin.Context){
		name := c.Query("name")

		if len(name) == 0 {
			c.Error(errors.New("name cannot be empty"))
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		result, user := service.GetUserByName(name, c)

		if result.Error != nil {
			c.Error(result.Error)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		c.IndentedJSON(http.StatusOK, user)	
	}

