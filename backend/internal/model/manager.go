package model

type Manager struct {
	ID int `json:"id" gorm:"primaryKey;autoIncrement"`
	UserID int `json:"user_id" gorm:"not null"`
	User User  `gorm:"foreignKey:UserID"`
	NumGamesManaged int `json:"num_games_managed"`
}