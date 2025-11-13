package handler

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"backend/internal/model"
	"backend/internal/db"
	"backend/internal/middleware"

)

func PerformLogin(c *gin.Context){
	var input model.LoginInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // search against database of users
	gormDB := db.GetDB(c)
	var user model.User
	result := gormDB.Where("name = ?", input.Username).First(&user)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "username does not exist"})
		return
	}

    if input.Password == user.Password { 
        token, err := middleware.GenerateJWTToken(input.Username)
        if err != nil {	
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
            return
        }
        c.JSON(http.StatusOK, gin.H{"token": token})
    } else {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
    }
}

func GetProfile(c *gin.Context){
	// Access username from context after successful authentication
	username, _ := c.Get("username")
	c.JSON(http.StatusOK, gin.H{"message": "Welcome to your profile, " + username.(string)})
}

func GetDashboard(c *gin.Context){
	c.JSON(http.StatusOK, gin.H{"message": "This is your dashboard!"})
}
