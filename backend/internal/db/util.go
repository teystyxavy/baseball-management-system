package db

import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"log"
	"os"
	"backend/internal/model"
)

func GetDB(c *gin.Context) *gorm.DB {
		dbInterface, present := c.Get("db")
		if !present {
			c.Error(fmt.Errorf("db not found"))
			c.AbortWithStatus(http.StatusInternalServerError)
			return nil
		}
		db, ok := dbInterface.(*gorm.DB)
		if !ok {
			c.Error(fmt.Errorf("db is not a *gorm.DB"))
			c.AbortWithStatus(http.StatusInternalServerError)
			return nil
		}
		return db
}

func ConnectToDB() *gorm.DB {
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

	db.AutoMigrate(&model.User{}, &model.Player{}, &model.Game{}, &model.Team{}, &model.AtBat{}, &model.Manager{})
	return db
}