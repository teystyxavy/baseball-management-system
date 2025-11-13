package route

import (
	"github.com/gin-gonic/gin"
	"backend/internal/handler"
)

// protected routes are be create, update and delete
func SetProtectedRoutes(routerGroup *gin.RouterGroup) {
	routerGroup.POST("/players", handler.CreatePlayer)
	routerGroup.DELETE("/players/:id", handler.DeletePlayerById)
	routerGroup.PUT("/players/:id", handler.UpdatePlayerById)

	routerGroup.POST("/games", handler.CreateGame)
	routerGroup.DELETE("/games/:id", handler.DeleteGameById)
	routerGroup.PUT("/games/:id", handler.UpdateGameById)

	routerGroup.POST("/teams", handler.CreateTeam)
	routerGroup.DELETE("/teams/:id", handler.DeleteTeamById)
	routerGroup.PUT("/teams/:id", handler.UpdateTeamById)

	routerGroup.POST("/users", handler.CreateUser)
	routerGroup.DELETE("/users/:id", handler.DeleteUserById)
	routerGroup.PUT("/users/:id", handler.UpdateUserById)
}

func SetPublicRoutes(router *gin.Engine) {
	router.POST("/login", handler.PerformLogin) // login route to generate JWT token
	router.GET("/profile", handler.GetProfile)
	router.GET("/dashboard", handler.GetDashboard)

	router.GET("/players", handler.GetPlayers)
	router.GET("/players/:id", handler.GetPlayerByID)

	router.GET("/games", handler.GetGame)
	router.GET("/games/:id", handler.GetGameByID)

	router.GET("/teams", handler.GetTeams)
	router.GET("/teams/:id", handler.GetTeamByID)

	router.GET("/users", handler.GetUsers)	
	router.GET("/users/:id", handler.GetUserByID)
}

