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

func TestRegisterUser_Fail(t *testing.T) {
	router := createTestEngine()
	w := httptest.NewRecorder()
	testRegisterDTO := dto.RegisterDTO{Name: "xavier", Email: "xavier@gmail.com", Password: "password"}
	requestBody, _ := json.Marshal(testRegisterDTO)
	req, _ := http.NewRequest("POST", "/register", strings.NewReader(string(requestBody)))
	req.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req)
	assert.Equal(t, http.StatusInternalServerError, w.Code)
	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, "username already exists", response["message"])
}

func TestRegisterUser_Success(t *testing.T) {
	router := createTestEngine()
	w := httptest.NewRecorder()
	name := "1"
	email := name + "@gmail.com"
	password := "password"
	testRegisterDTO := dto.RegisterDTO{Name: name, Email: email, Password: password}
	requestBody, _ := json.Marshal(testRegisterDTO)
	req, _ := http.NewRequest("POST", "/register", strings.NewReader(string(requestBody)))
	req.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req)
	assert.Equal(t, http.StatusCreated, w.Code)

	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, name, response["name"])
	assert.Equal(t, email, response["email"])
	assert.NotContains(t, response, "password")
}


func TestLogin_Success(t *testing.T) {
	router := createTestEngine()
	w := httptest.NewRecorder()
	testLoginDTO := dto.LoginDTO{Email: "xavier@gmail.com", Password: "password"}
	requestBody, _ := json.Marshal(testLoginDTO)
	req, _ := http.NewRequest("POST", "/login", strings.NewReader(string(requestBody)))
	router.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)
	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Contains(t, response, "token")
}