package middleware

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next() // process request first

		if len(c.Errors) > 0 {
			err := c.Errors.Last()
			statusCode := c.Writer.Status()
			if statusCode == http.StatusOK {
				statusCode = http.StatusInternalServerError
			}
			c.JSON(statusCode, map[string]any{
                "success": false,
                "message": err.Error(),
            })
		}
	}
}