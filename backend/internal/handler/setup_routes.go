package handler

import (
	"github.com/gin-gonic/gin"
)

// protected routes are be create, update and delete
func SetProtectedRoutes(routerGroup *gin.RouterGroup) {
	routerGroup.POST("/players", CreatePlayer)
	routerGroup.DELETE("/players/:id", DeletePlayerById)
	routerGroup.PUT("/players/:id", UpdatePlayerById)

	routerGroup.POST("/games", CreateGame)
	routerGroup.DELETE("/games/:id", DeleteGameById)
	routerGroup.PUT("/games/:id", UpdateGameById)

	routerGroup.POST("/teams", CreateTeam)
	routerGroup.DELETE("/teams/:id", DeleteTeamById)
	routerGroup.PUT("/teams/:id", UpdateTeam)

	routerGroup.POST("/users", CreateUser)
	routerGroup.DELETE("/users/:id", DeleteUserById)
	routerGroup.PUT("/users/:id", UpdateUser)

	routerGroup.POST("/at-bats", CreateAtBat)
	routerGroup.DELETE("/at-bats/:id", DeleteAtBatById)
	routerGroup.PUT("/at-bats/:id", UpdateAtBat)
}

func SetPublicRoutes(router *gin.Engine) {
	router.POST("/login", Login) // login route to generate JWT token
	router.POST("/register", RegisterUser) // register route to generate JWT token

	router.GET("/players", GetPlayers)
	router.GET("/players/:id", GetPlayerByID)

	router.GET("/games", GetAllGames)
	router.GET("/games/:id", GetGameByID)

	router.GET("/teams", GetTeams)
	router.GET("/teams/:id", GetTeamByID)

	router.GET("/users/all", GetUsers)	
	router.GET("/users/:id", GetUserByID)
	router.GET("/users", GetUserByName) // /users?name=xavier

	router.GET("/at-bats", GetAtBats)
	router.GET("/at-bats/player/:id", GetAtBatsByPlayerID)
	router.GET("/at-bats/:player_id/:game_id", GetAtBatsByPlayerIDAndGameID)
}

