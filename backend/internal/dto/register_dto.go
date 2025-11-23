package dto

type RegisterDTO struct {
	Name string `json:"name"`
	Email string `json:"email"`
	Password string `json:"password"`
	IsAdmin bool `json:"is_admin"`
	IsManager bool `json:"is_manager"`
}