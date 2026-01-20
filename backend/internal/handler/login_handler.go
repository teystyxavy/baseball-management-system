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
		c.Abort()
		return
	}

	var output dto.RegisterResponseDTO
	output.Email = newUser.Email
	output.Name = newUser.Name
	output.Role = newUser.Role

	c.IndentedJSON(http.StatusCreated, output)
}