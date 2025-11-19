package setup

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"backend/internal/middleware"
	"backend/internal/handler"
)

func InitRouter(db *gorm.DB) *gin.Engine {
	router := gin.Default()
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