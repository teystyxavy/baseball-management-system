package handler

import (
	"github.com/gin-gonic/gin"
)

// protected routes are be create, update and delete
func SetProtectedRoutes(routerGroup *gin.RouterGroup) {
	routerGroup.POST("/player", CreatePlayer)
	routerGroup.POST("/players", CreatePlayers)
	routerGroup.DELETE("/player/:id", DeletePlayerById)
	routerGroup.PUT("/player/:id", UpdatePlayerById)

	routerGroup.POST("/game", CreateGame)
	routerGroup.DELETE("/game/:id", DeleteGameById)
	routerGroup.PUT("/game/:id", UpdateGameById)

	routerGroup.POST("/team", CreateTeam)
	routerGroup.DELETE("/team/:id", DeleteTeamById)
	routerGroup.PUT("/team/:id", UpdateTeam)

	routerGroup.POST("/user", CreateUser)
	routerGroup.DELETE("/user/:id", DeleteUserById)
	routerGroup.PUT("/user/:id", UpdateUser)

	routerGroup.POST("/at-bat", CreateAtBat)
	routerGroup.DELETE("/at-bat/:id", DeleteAtBatById)
	routerGroup.PUT("/at-bat/:id", UpdateAtBat)
}

func SetPublicRoutes(router *gin.Engine) {
	router.POST("/login", Login) // login route to generate JWT token
	router.POST("/register", RegisterUser) // register route to generate JWT token

	router.GET("/players", GetPlayers)
	router.GET("/player/:id", GetPlayerByID)

	router.GET("/games", GetAllGames)
	router.GET("/game/:id", GetGameByID)

	router.GET("/teams", GetTeams)
	router.GET("/team/:id", GetTeamByID)

	router.GET("/users/all", GetUsers)	
	router.GET("/user/:id", GetUserByID)
	router.GET("/user", GetUserByEmail)

	router.GET("/at-bats", GetAtBats)
	router.GET("/at-bat/player/:id", GetAtBatsByPlayerID)
	router.GET("/at-bat/:player_id/:game_id", GetAtBatsByPlayerIDAndGameID)
}

