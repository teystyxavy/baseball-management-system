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
		log.Println("No .env file loaded or error loading .env (continuing with env vars)")
	}

	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbHost := os.Getenv("DB_HOST")
	if dbHost == "" {
		dbHost = os.Getenv("HOSTNAME")
	}
	port := os.Getenv("DB_PORT")
	if port == "" {
		port = os.Getenv("PORT")
	}
	if port == "" {
		port = "5432"
	}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Singapore",
						dbHost, dbUser, dbPassword, dbName, port)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal(err)
	}


	// replace automigrate with raw sql for better control
	// db.AutoMigrate(&model.User{}, &model.Player{}, &model.Game{}, &model.Team{}, &model.AtBat{}, &model.Manager{})

	deleteTableSQL := []string {
		`DROP TABLE IF EXISTS "users" CASCADE`,
		`DROP TABLE IF EXISTS "teams" CASCADE`,
		`DROP TABLE IF EXISTS "players" CASCADE`,
		`DROP TABLE IF EXISTS "games" CASCADE`,
		`DROP TABLE IF EXISTS "at_bats" CASCADE`,
		`DROP TABLE IF EXISTS "managers" CASCADE`,
	}

	for _, sql := range deleteTableSQL {
		if err := db.Exec(sql).Error; err != nil {
			log.Fatal(err)
	}
}
	
	createTableSQL := []string {
		`CREATE TABLE IF NOT EXISTS "users" (
			"id" SERIAL PRIMARY KEY,
			"CREATED_AT" TIMESTAMP,
			"UPDATED_AT" TIMESTAMP,
			"DELETED_AT" TIMESTAMP,
			"name" TEXT NOT NULL,
			"email" TEXT NOT NULL,
			"password" TEXT NOT NULL,
			"role" TEXT NOT NULL,
			"bio" TEXT,
			"phone" INTEGER
		);`,
		`CREATE TABLE IF NOT EXISTS "teams" (
			"id" SERIAL PRIMARY KEY,
			"CREATED_AT" TIMESTAMP,
			"UPDATED_AT" TIMESTAMP,
			"DELETED_AT" TIMESTAMP,
			"name" TEXT NOT NULL,
			"wins" INTEGER,
			"losses" INTEGER,
			"player_count" INTEGER,
			"games_played" INTEGER,
			"founded" TIMESTAMP NOT NULL
		);`,
		`CREATE TABLE IF NOT EXISTS "players" (
			"id" SERIAL PRIMARY KEY,
			"CREATED_AT" TIMESTAMP,
			"UPDATED_AT" TIMESTAMP,
			"DELETED_AT" TIMESTAMP,
			"name" TEXT NOT NULL,
			"jersey_number" INTEGER,
			"position" TEXT,
			"num_games_played" INTEGER,
			"num_at_bats" INTEGER,
			"num_singles" INTEGER,
			"num_on_bases" INTEGER,
			"num_walks" INTEGER,
			"num_strikeouts" INTEGER,
			"num_home_runs" INTEGER,
			"num_doubles" INTEGER,
			"num_triples" INTEGER,
			"num_ground_outs" INTEGER,
			"num_flyouts" INTEGER,
			"num_runs_brought_in" INTEGER,
			"team_id" INTEGER NOT NULL,
			FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE
		);`,
		`CREATE TABLE IF NOT EXISTS "games" (
			"id" SERIAL PRIMARY KEY,
			"CREATED_AT" TIMESTAMP,
			"UPDATED_AT" TIMESTAMP,
			"DELETED_AT" TIMESTAMP,
			"date" TIMESTAMP NOT NULL,
			"location" TEXT NOT NULL,
			"home_team_id" INTEGER NOT NULL,
			"away_team_id" INTEGER NOT NULL,
			FOREIGN KEY ("home_team_id") REFERENCES "teams"("id") ON DELETE CASCADE,
			FOREIGN KEY ("away_team_id") REFERENCES "teams"("id") ON DELETE CASCADE
		);`,
		`CREATE TABLE IF NOT EXISTS "at_bats" (
			"id" SERIAL PRIMARY KEY,
			"CREATED_AT" TIMESTAMP,
			"UPDATED_AT" TIMESTAMP,
			"DELETED_AT" TIMESTAMP,
			"game_id" INTEGER NOT NULL,
			"player_id" INTEGER NOT NULL,
			"at_bat_num" INTEGER NOT NULL,
			"type_of_hit" TEXT NOT NULL,
			"runs_brought_in" INTEGER NOT NULL,
			FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE,
			FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE CASCADE
		);`,
		`CREATE TABLE IF NOT EXISTS "managers" (
			"id" SERIAL PRIMARY KEY,
			"CREATED_AT" TIMESTAMP,
			"UPDATED_AT" TIMESTAMP,
			"DELETED_AT" TIMESTAMP,
			"user_id" INTEGER NOT NULL,
			"num_games_managed" INTEGER NOT NULL,
			FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
		);`,
	}

	for _, sql := range createTableSQL {
		if err := db.Exec(sql).Error; err != nil {
			log.Fatal(err)
		}
	}
	return db
}