package api

import (
	"ReynokArsted/tic-tac-toe9x9/forum-service/internal/models"
	"encoding/json"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (srv *Server) createPostHandler(c echo.Context) error {
	if c.Request().Method != http.MethodPost {
		return c.JSON(http.StatusMethodNotAllowed, "method not allowed")
	}

	var (
		post models.Post
	)
	answer := models.Answer{Post_id: -1}
	err := json.NewDecoder(c.Request().Body).Decode(&post)
	if err != nil {
		answer.Error = "invalid request body"
		return c.JSON(http.StatusBadRequest, answer)
	}
	if post.Author == "" || post.Title == "" || post.Content == "" {
		answer.Error = "остались незаполненные поля"
		return c.JSON(http.StatusBadRequest, answer)
	}
	id, err := srv.uc.AddPost(post)
	if err != nil {
		answer.Error = err.Error()
		return c.JSON(http.StatusInternalServerError, answer)
	}
	answer.Post_id = id
	return c.JSON(http.StatusCreated, answer)
}
