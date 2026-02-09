package model

type Game struct {
	ID int `json:"id" gorm:"primaryKey;autoIncrement"`
	Date       string `json:"date" gorm:"not null"`
	Location  string `json:"location" gorm:"not null"`
	HomeTeamID Team `json:"home_team_id" gorm:"foreignKey:home_team_id;references:ID"`
	AwayTeamID Team `json:"away_team_id" gorm:"foreignKey:away_team_id;references:ID"`
	RunsScored1 int `json:"runs_scored_1"`
	RunsScored2 int `json:"runs_scored_2"`
}