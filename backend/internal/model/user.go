package model


type User struct {
    ID      int `json:"id" gorm:"primaryKey;autoIncrement"`
    Name     string `json:"name" gorm:"unique;not null"`
    Email    string `json:"email" gorm:"unique;not null"`
    Password string `json:"password" gorm:"not null"`
    Role string `json:"role" gorm:"not null"`
    Bio string `json:"bio"`
    Phone int  `json:"phone"`
}
