package api

import "ReynokArsted/tic-tac-toe9x9/auth-service/internal/models"

type Usecase interface {
	AddUser(*models.User) (models.Answer, error)
	GetUserByLogin(string) (models.Answer, error)
	CheckPassword(login, password string) (models.Answer, error)
}
