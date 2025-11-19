package main

import (
	"backend/internal/db"
	"backend/internal/setup"
)

func main() {
	gormDB := db.ConnectToDB()
	router := setup.InitRouter(gormDB)
	router.Run("localhost:8080")
}