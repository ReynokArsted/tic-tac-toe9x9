package api

import (
	"ReynokArsted/tic-tac-toe9x9/auth-service/internal/models"
	"ReynokArsted/tic-tac-toe9x9/auth-service/internal/provider"
	"encoding/json"
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
	if c.Request().Method != http.MethodPost {
		return c.String(http.StatusMethodNotAllowed, "Method not allowed")
	}
	// Распарсиваем JSON-тело запроса
	var user models.User
	err := json.NewDecoder(c.Request().Body).Decode(&user)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid request body")
	}
	if user.Login == "" || user.Password == "" || user.Username == "" {
		return c.String(http.StatusBadRequest, "Поля не могут быть незаполненными.")
	}
	// Проверяем, существует ли пользователь в базе данных
	existingUser, err := srv.uc.GetUserByLogin(user.Login)
	if err != nil {
		log.Println("failed to fetch user", err)
		return c.String(http.StatusInternalServerError, "failed to fetch user")
	}
	// Если пользователь не существует, то добавляем его
	if existingUser == nil {
		err = srv.uc.AddUser(&user)
		if err != nil {
			log.Println("failed to create user", err)
			return c.String(http.StatusInternalServerError, "failed to fetch user")
		}
		return c.String(http.StatusCreated, "Пользователь "+user.Login+" был успешно добавлен\n")
	} else {
		return c.String(http.StatusOK, "Пользователь "+user.Login+" уже добавлен\n")
	}

}
