package provider

import (
	"ReynokArsted/tic-tac-toe9x9/auth-service/internal/models"
	"database/sql"
)

// поиск пользователя по логину
func (p *Provider) GetUserByLogin(login string) (*models.User, error) {
	query := "SELECT id, login, password, username FROM registred_users WHERE login = $1"
	row := p.UserDB.QueryRow(query, login)
	var user models.User
	if err := row.Scan(&user.ID, &user.Login, &user.Password, &user.Username); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // Пользователь не найден
		}
		return nil, err
	}
	return &user, nil //Пользователь найден
}

func (p *Provider) AddUser(user *models.User) error {
	query := "INSERT INTO registred_users (login, password, username) VALUES ($1, $2, $3)"
	_, err := p.UserDB.Exec(query, user.Login, user.Password, user.Username)
	if err != nil {
		return err
	}
	return nil
}
