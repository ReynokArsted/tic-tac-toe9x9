package models

import "errors"

type User struct {
	ID       int    `json:"id"`
	Login    string `json:"login"`
	Password string `json:"password"`
	Username string `json:"username"`
	Win      int
	Lose     int
}

type Answer struct {
	Login    string `json:"login"`
	Password string `json:"password"`
	Username string `json:"username"`
	Win      int    `json:"win"`
	Lose     int    `json:"lose"`
	Error    string `json:"error"`
}

var (
	ErrWrongPassword = errors.New("введен неверный логин/пароль")
	ErrUserNotFound  = errors.New("пользователь не найден")
)
