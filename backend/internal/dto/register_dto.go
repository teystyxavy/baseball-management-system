package dto

type RegisterDTO struct {
	Name string `json:"name"`
	Email string `json:"email"`
	Password string `json:"password"`
	TeamID int `json:"team_id"`
}