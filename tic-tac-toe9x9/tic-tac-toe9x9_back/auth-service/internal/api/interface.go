package api

import (
	"ReynokArsted/tic-tac-toe9x9/auth-service/internal/models"

	"github.com/labstack/echo/v4"
)

type Usecase interface {
	AddUser(*models.User) (models.Answer, error)
	GetUserByLogin(string) (models.Answer, error)
	CheckPassword(string, string) (models.Answer, error)
	GenerateJWT(string) (string, error)
	CheckCookie(echo.Context) (models.Answer, error)
}
