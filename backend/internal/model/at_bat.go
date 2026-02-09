package model

type AtBat struct {
	PlayerID int `json:"player_id" gorm:"primaryKey;not null;foreignKey:PlayerID;references:ID"`
	GameID int `json:"game_id" gorm:"primaryKey;not null;foreignKey:GameID;references:ID"`
	AtBatNum int `json:"at_bat_num" gorm:"primaryKey;not null"`
	TypeOfHit string `json:"type_of_hit" gorm:"not null"`
	RunsBroughtIn int `json:"runs_brought_in" gorm:"not null"`
}