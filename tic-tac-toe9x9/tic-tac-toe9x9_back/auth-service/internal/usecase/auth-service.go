package usecase

import "ReynokArsted/tic-tac-toe9x9/auth-service/internal/models"

func (u *Usecase) AddUser(user *models.User) error {
	return u.p.AddUser(user)
}
func (u *Usecase) GetUserByLogin(login string) (*models.User, error) {
	return u.p.GetUserByLogin(login)
}
