package usecase

import "ReynokArsted/tic-tac-toe9x9/auth-service/internal/models"

type Provider interface {
	GetUserByLogin(string) (models.Answer, error)
	AddUser(user *models.User) (models.Answer, error)
	CheckPassword(login, password string) (models.Answer, error)
}
