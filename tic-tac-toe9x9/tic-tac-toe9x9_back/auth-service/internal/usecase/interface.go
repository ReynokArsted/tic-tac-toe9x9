package usecase

import "ReynokArsted/tic-tac-toe9x9/auth-service/internal/models"

type Provider interface {
	GetUserByLogin(string) (*models.User, error)
	AddUser(user *models.User) error
}
