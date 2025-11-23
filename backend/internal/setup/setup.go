package setup

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"backend/internal/middleware"
	"backend/internal/handler"
	"github.com/gin-contrib/cors"
)

func InitRouter(db *gorm.DB) *gin.Engine {
	router := gin.Default()
	// Add CORS middleware
    router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"}, // Your Next.js frontend URL
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
    }))
	
	// set DB
	router.Use(func (c *gin.Context) {
		c.Set("db", db)
		c.Next()
	})

	router.Use(middleware.ErrorHandler())

	handler.SetPublicRoutes(router)
	protected := router.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	handler.SetProtectedRoutes(protected)

	return router
}