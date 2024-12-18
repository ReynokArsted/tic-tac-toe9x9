package api

import (
	"ReynokArsted/tic-tac-toe9x9/auth-service/internal/models"
	"ReynokArsted/tic-tac-toe9x9/auth-service/internal/provider"
	"encoding/json"
	"errors"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

type UserHandler struct {
	provider *provider.Provider
}

func NewUserHandler(provider *provider.Provider) *UserHandler {
	return &UserHandler{provider: provider}
}

// CreateOrUpdateUser обрабатывает запрос на создание или обновление пользователя
func (srv *Server) SingInHandler(c echo.Context) error {
	answer := models.Answer{
		Login:    "",
		Username: "",
		Password: "",
		Win:      0,
		Lose:     0,
		Error:    "",
	}
	if c.Request().Method != http.MethodGet {
		answer.Error = errors.New("method not allowed").Error()
		return c.JSON(http.StatusMethodNotAllowed, answer)
	}
	// Распарсиваем JSON-тело запроса
	var user models.User
	err := json.NewDecoder(c.Request().Body).Decode(&user)
	if err != nil {
		answer.Error = errors.New("invalid request body").Error()
		return c.JSON(http.StatusBadRequest, answer)
	}
	if user.Login == "" || user.Password == "" || user.Username == "" {
		answer.Error = errors.New("поля не могут быть незаполненными").Error()
		return c.JSON(http.StatusBadRequest, answer)
	}
	// Проверяем, существует ли пользователь в базе данных
	_, err = srv.uc.GetUserByLogin(user.Login)
	if err != nil {
		log.Println("failed to fetch user", err)
		answer.Error = errors.New("failed to fetch user").Error()
		return c.JSON(http.StatusInternalServerError, answer)
	}
	// Если пользователь не существует, то добавляем его
	if err == models.ErrUserNotFound {
		answer, err = srv.uc.AddUser(&user)
		if err != nil {
			answer.Error = errors.New("failed to create user").Error()
			log.Println("failed to create user", err)
			return c.JSON(http.StatusInternalServerError, answer)
		}

		return c.JSON(http.StatusCreated, answer)
	} else {
		answer.Error = errors.New("пользователь уже существует, измените логин или войдите").Error()
		return c.JSON(http.StatusOK, answer)
	}

}

func (srv *Server) SingUpHandler(c echo.Context) error {
	answer := models.Answer{
		Login:    "",
		Username: "",
		Password: "",
		Win:      0,
		Lose:     0,
		Error:    "",
	}
	if c.Request().Method != http.MethodGet {
		answer.Error = errors.New("method not allowed").Error()
		return c.JSON(http.StatusMethodNotAllowed, answer)
	}
	// Распарсиваем JSON-тело запроса
	var user models.User
	err := json.NewDecoder(c.Request().Body).Decode(&user)
	if err != nil {
		answer.Error = errors.New("invalid request body").Error()
		return c.JSON(http.StatusBadRequest, answer)
	}
	if user.Login == "" || user.Password == "" {
		answer.Error = errors.New("поля не могут быть незаполненными").Error()
		return c.JSON(http.StatusBadRequest, answer)
	}
	// Проверяем, существует ли пользователь в базе данных и верный ли пароль.
	foundedUser, err := srv.uc.CheckPassword(user.Login, user.Password)
	if err != nil {
		if err == models.ErrWrongPassword {
			answer.Password = user.Password
			answer.Login = user.Login
			answer.Error = models.ErrWrongPassword.Error()
			return c.JSON(http.StatusBadRequest, answer)
		}
		if err == models.ErrUserNotFound {
			answer.Login = user.Login
			answer.Password = user.Password
			answer.Error = models.ErrUserNotFound.Error()
			return c.JSON(http.StatusBadRequest, answer)
		}
	} else {
		answer.Login = foundedUser.Login
		answer.Password = foundedUser.Password
		answer.Username = foundedUser.Username
		answer.Win = foundedUser.Win
		answer.Lose = foundedUser.Lose
		return c.JSON(http.StatusOK, answer)
	}
	return c.JSON(http.StatusInternalServerError, answer)
}
