package main

import (
	"backend/internal/middleware"
	"backend/internal/model"
	"backend/internal/route"
	"fmt"
	"log"
	"os"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbHost := os.Getenv("HOSTNAME")
	port := os.Getenv("PORT")
	
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Singapore",
						dbHost, dbUser, dbPassword, dbName, port)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal(err)
	}


	db.AutoMigrate(&model.User{}, &model.Player{}, &model.Game{}, &model.Team{})
	
	router := gin.Default()

	// set DB
	router.Use(func (c *gin.Context) {
		c.Set("db", db)
		c.Next()
	}) 

	router.Use(middleware.ErrorHandler())

	route.SetPublicRoutes(router)

	protected := router.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	route.SetProtectedRoutes(protected)
	route.SetPublicRoutes(router)
	
	router.Run("localhost:8080")
}