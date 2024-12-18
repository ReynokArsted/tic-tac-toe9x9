package provider

import (
	"ReynokArsted/tic-tac-toe9x9/auth-service/internal/models"
	"database/sql"
	"fmt"
)

// поиск пользователя по логину
func (p *Provider) GetUserByLogin(login string) (models.Answer, error) {
	query := "SELECT login, password, username, win, lose FROM registred_users WHERE login = $1"
	answer := models.Answer{
		Login:    "",
		Password: "",
		Username: "",
		Win:      0,
		Lose:     0,
		Error:    "",
	}
	row := p.UserDB.QueryRow(query, login)
	if err := row.Scan(&answer.Login, &answer.Password, &answer.Username, &answer.Win, &answer.Lose); err != nil {
		if err == sql.ErrNoRows {
			return answer, models.ErrUserNotFound // Пользователь не найден
		}
		return answer, err
	}
	return answer, nil //Пользователь найден
}

func (p *Provider) AddUser(user *models.User) (models.Answer, error) {
	query := "INSERT INTO registred_users (login, password, username, win, lose) VALUES ($1, $2, $3, $4, $5)"
	_, err := p.UserDB.Exec(query, user.Login, user.Password, user.Username, 0, 0)
	answer := models.Answer{
		Login:    user.Login,
		Password: user.Password,
		Username: user.Username,
		Win:      0,
		Lose:     0,
		Error:    "",
	}
	if err != nil {
		answer.Error = err.Error()
		return answer, err
	}
	return answer, nil
}

func (p *Provider) CheckPassword(login, password string) (models.Answer, error) {
	answer, err := p.GetUserByLogin(login)
	if err != nil {
		answer.Error = err.Error()
		return answer, err
	}
	if answer.Password != password {
		fmt.Println(password, "ihjh", answer.Password, answer.Error)
		answer.Error = models.ErrWrongPassword.Error()
		return answer, models.ErrWrongPassword
	}
	return answer, nil
}
