package dto

type RegisterResponseDTO struct {
	Name string `json:"name"`
	Email string `json:"email"`
	IsAdmin bool `json:"is_admin"`
	IsManager bool `json:"is_manager"`
}