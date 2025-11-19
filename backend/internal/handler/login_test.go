package handler

import (
	"net/http"
	"testing"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"backend/internal/db"
	"backend/internal/dto"
	"encoding/json"
	"strings"
	"gorm.io/gorm"
	"backend/internal/middleware"
	"net/http/httptest"
)


func InitRouter(db *gorm.DB) *gin.Engine {
	router := gin.Default()
	// set DB
	router.Use(func (c *gin.Context) {
		c.Set("db", db)
		c.Next()
	})

	router.Use(middleware.ErrorHandler())

	SetPublicRoutes(router)

	protected := router.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	SetProtectedRoutes(protected)

	return router
}

func createTestEngine() *gin.Engine {
	gormDB := db.ConnectToDB()
	router := InitRouter(gormDB)
	return router
}

func TestLogin(t *testing.T) {
	router := createTestEngine()
	w := httptest.NewRecorder()
	testLoginDTO := dto.LoginDTO{Username: "xavier", Password: "password"}
	requestBody, _ := json.Marshal(testLoginDTO)
	req, _ := http.NewRequest("POST", "/login", strings.NewReader(string(requestBody)))
	router.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)

}

func TestRegisterUser(t *testing.T) {
	router := createTestEngine()
	w := httptest.NewRecorder()
	testRegisterDTO := dto.RegisterDTO{Name: "dorcas", Email: "dorcas@gmail.com", Password: "password"}
	requestBody, _ := json.Marshal(testRegisterDTO)
	req, _ := http.NewRequest("POST", "/register", strings.NewReader(string(requestBody)))
	router.ServeHTTP(w, req)
	assert.Equal(t, http.StatusCreated, w.Code)
	assert.Equal(t, "User dorcas created successfully", w.Body.String())
}

