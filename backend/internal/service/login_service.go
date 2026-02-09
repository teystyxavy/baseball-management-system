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
	"unicode"
)

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func checkPassword(hashedPassword, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}

func isPasswordValid(password string) bool { // password must be at least 8 chars, contain 1 lower and uppercase letter, and contain a special character
	validLength := len(password) >= 8
	containsLower := false
	containsUpper := false
	containsSymbol := false
	for _, r := range password {
		if unicode.IsLower(r) {
			containsLower = true
		}
		if unicode.IsUpper(r) {
			containsUpper = true
		}
		if unicode.IsPunct(r) || unicode.IsSymbol(r) {
			containsSymbol = true
		}
	}

	return validLength && containsLower && containsUpper && containsSymbol
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
		return fmt.Errorf("email already exists"), model.User{}
	}

	if (!isPasswordValid(registerDTO.Password)) {
		return fmt.Errorf("Password must be at least 8 chars long, and contain 1 lowercase, uppercase and special character"), model.User{}
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
	user.Role = registerDTO.Role
	result := gormDB.Create(&user)
	return result.Error, user
}