package service

import (
	"backend/internal/db"
	"backend/internal/dto"
	"backend/internal/middleware"
	"backend/internal/model"
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func checkPassword(hashedPassword, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}

func PerformLogin(input dto.LoginDTO, c *gin.Context) (string, error) {
	gormDB := db.GetDB(c)
	var user model.User
	result := gormDB.Where("email = ?", input.Email).First(&user)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "email does not exist"})
		return "", fmt.Errorf("username does not exist")
	}

    if checkPassword(user.Password, input.Password) { 
        token, err := middleware.GenerateJWTToken(user.Name)
		return token, err
	} else {
		return "", fmt.Errorf("invalid password")
	}
}

func PerformRegisterUser(registerDTO dto.RegisterDTO, c *gin.Context) (error, model.User) {
    // search against database of users
	gormDB := db.GetDB(c)
	var user model.User
	nameResult := gormDB.Where("name = ?", registerDTO.Name).First(&user)
	if nameResult.Error == nil {
		return fmt.Errorf("username already exists"), model.User{}
	}
	emailResult := gormDB.Where("email = ?", registerDTO.Email).First(&user)
	if emailResult.Error == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "email already exists"})
		return fmt.Errorf("email already exists"), model.User{}
	}

	// create new user in the DB
	user.Name = registerDTO.Name
	user.Email = registerDTO.Email

	// hash password
	hashedPassword, err := hashPassword(registerDTO.Password)
	if err != nil {
		return err, model.User{}
	}

	user.Password = hashedPassword
	user.IsAdmin = registerDTO.IsAdmin
	result := gormDB.Create(&user)
	return result.Error, user
}

// func GetProfile(c *gin.Context){
// 	// Access username from context after successful authentication
// 	username, _ := c.Get("username")
// 	c.JSON(http.StatusOK, gin.H{"message": "Welcome to your profile, " + username.(string)})
// }

// func GetDashboard(c *gin.Context){
// 	c.JSON(http.StatusOK, gin.H{"message": "This is your dashboard!"})
// }