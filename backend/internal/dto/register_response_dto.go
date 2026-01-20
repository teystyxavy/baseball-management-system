package dto

type RegisterResponseDTO struct {
	Name string `json:"name"`
	Email string `json:"email"`
	Role string	`json:"role"`
}