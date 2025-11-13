package middleware

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)

var jwtSecret []byte = GetSecretKey()


type MyCustomClaims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

// GetSecretKey returns the secret key from the environment variable JWT_SECRET
func GetSecretKey() []byte {
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}
	secretKeyString := os.Getenv("JWT_SECRET")
	var jwtSecret = []byte(secretKeyString)
	return jwtSecret
}

// GenerateJWTToken generates a JWT token with the given username and expiration time
func GenerateJWTToken(username string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour) // 24 hours
	claims := &MyCustomClaims{
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
			Issuer:    "Baseball Management System",
			ID:        "",
			Audience:   []string{"Baseball Management System"},

		},
	}
	
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims) // create a new JWT token with the given claims	
	tokenString, err := token.SignedString(jwtSecret) // sign the token with the secret key
	if err != nil {
		return "", err
	}
	return tokenString, nil
}