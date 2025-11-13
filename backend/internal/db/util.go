package db

import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
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