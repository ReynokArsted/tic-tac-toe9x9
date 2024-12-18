package api

import "ReynokArsted/tic-tac-toe9x9/auth-service/internal/models"

type Usecase interface {
	AddUser(*models.User) error
	GetUserByLogin(string) (*models.User, error)
}
