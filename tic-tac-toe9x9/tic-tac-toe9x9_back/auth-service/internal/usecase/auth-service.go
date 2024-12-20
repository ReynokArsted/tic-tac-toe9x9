package usecase

import (
	"ReynokArsted/tic-tac-toe9x9/auth-service/internal/models"
)

func (u *Usecase) AddUser(user *models.User) (models.Answer, error) {
	return u.p.AddUser(user)
}
func (u *Usecase) GetUserByLogin(login string) (models.Answer, error) {
	return u.p.GetUserByLogin(login)
}

func (u *Usecase) CheckPassword(login, password string) (models.Answer, error) {
	return u.p.CheckPassword(login, password)
}

func (u *Usecase) GenerateJWT(login string) (string, error) {
	return u.p.GenerateJWT(login)
}
