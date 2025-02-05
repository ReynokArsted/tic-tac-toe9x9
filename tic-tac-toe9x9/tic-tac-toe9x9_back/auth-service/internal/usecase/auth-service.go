package usecase

import (
	"ReynokArsted/tic-tac-toe9x9/auth-service/internal/models"
	"fmt"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
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

func (u *Usecase) CheckCookie(c echo.Context) (models.Answer, error) {
	var answer models.Answer
	answer.Login = ""
	cookie, err := c.Request().Cookie("token")
	if err != nil {
		return answer, fmt.Errorf("ошибка в cookie не обнаружен token или его извлечение неуспешно.")
	}
	token_string := cookie.Value
	claims := &models.Claims{}
	token, err := jwt.ParseWithClaims(token_string, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("ошибка при верификации токена %w", jwt.ErrTokenSignatureInvalid)
		}
		return models.JwtKey, nil
	})
	if err != nil {
		return answer, fmt.Errorf("ошибка при верификации токена %w", err)
	}
	answer, err = u.GetUserByLogin(claims.Login)
	if err != nil {
		return answer, err
	}
	if !token.Valid {
		return answer, fmt.Errorf("токен не действителен %w", jwt.ErrTokenSignatureInvalid)
	}

	return answer, nil
}
