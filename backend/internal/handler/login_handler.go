package handler

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"backend/internal/dto"
	"backend/internal/service"
)

func Login(c *gin.Context){
	var input dto.LoginDTO
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

	token, err := service.PerformLogin(input, c)
	if err != nil {
		c.Error(err)
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}
	c.JSON(http.StatusOK, gin.H{"token": token})
	c.SetCookie("auth_token", token, 3600, "/", "localhost", false, true)
}

func RegisterUser(c *gin.Context){
	var input dto.RegisterDTO
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

	err, newUser := service.PerformRegisterUser(input, c)
	if err != nil {
		c.Error(err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	c.IndentedJSON(http.StatusCreated, newUser)
}

func GetProfile(c *gin.Context){
	// Access username from context after successful authentication
	username, _ := c.Get("username")
	c.JSON(http.StatusOK, gin.H{"message": "Welcome to your profile, " + username.(string)})
}

func GetDashboard(c *gin.Context){
	c.JSON(http.StatusOK, gin.H{"message": "This is your dashboard!"})
}
