package route

import (
	"github.com/gin-gonic/gin"
	"web-gin/internal/handler"
)

func SetPlayerRoutes(router *gin.Engine) {
	router.GET("/players", handler.GetPlayers)
	router.GET("/players/:id", handler.GetPlayerByID)
	router.POST("/players", handler.CreatePlayer)
	router.DELETE("/players/:id", handler.DeletePlayerById)
	router.PUT("/players/:id", handler.UpdatePlayerById)
}

func SetGameRoutes(router *gin.Engine) {
	router.GET("/games", handler.GetGame)
	router.GET("/games/:id", handler.GetGameByID)
	router.POST("/games", handler.CreateGame)
	router.DELETE("/games/:id", handler.DeleteGameById)
	router.PUT("/games/:id", handler.UpdateGameById)
}

func SetTeamRoutes(router *gin.Engine) {
	router.GET("/teams", handler.GetTeams)
	router.GET("/teams/:id", handler.GetTeamByID)
	router.POST("/teams", handler.CreateTeam)
	router.DELETE("/teams/:id", handler.DeleteTeamById)
	router.PUT("/teams/:id", handler.UpdateTeamById)
}

func SetUserRoutes(router *gin.Engine) {
	router.GET("/users", handler.GetUsers)
	router.GET("/users/:id", handler.GetUserByID)
	router.POST("/users", handler.CreateUser)
	router.DELETE("/users/:id", handler.DeleteUserById)
	router.PUT("/users/:id", handler.UpdateUserById)
}