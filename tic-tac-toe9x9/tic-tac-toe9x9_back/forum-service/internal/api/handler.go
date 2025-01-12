package api

import (
	"ReynokArsted/tic-tac-toe9x9/forum-service/internal/models"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func (srv *Server) createPostHandler(c echo.Context) error {
	if c.Request().Method != http.MethodPost {
		return c.JSON(http.StatusMethodNotAllowed, map[string]string{"error": "method not allowed"})
	}

	var (
		post models.Post
	)
	answer := models.CreatedPost{Post_id: -1}
	authHeader := c.Request().Header.Get("Authorization")
	if authHeader == "" || len(authHeader) < 8 {
		answer.Error = "необходимо предоставить заголовок авторизации"
		return c.JSON(http.StatusUnauthorized, answer)
	}
	tokenString := authHeader[7:]                    // Извлекаем токен из заголовка "Bearer <token>"
	claims, err := srv.uc.ValidationJWT(tokenString) // проверяем токен
	if err != nil {
		answer.Error = "невозможно верифицировать токен " + err.Error()
		return c.JSON(http.StatusUnauthorized, answer)
	}
	err = json.NewDecoder(c.Request().Body).Decode(&post)
	if err != nil {
		answer.Error = "invalid request body"
		return c.JSON(http.StatusBadRequest, answer)
	}
	if post.Author == "" || post.Title == "" || post.Content == "" {
		answer.Error = "остались незаполненные поля"
		return c.JSON(http.StatusBadRequest, answer)
	}
	post.Author = claims.UserName
	id, err := srv.uc.AddPost(post)
	if err != nil {
		answer.Error = err.Error()
		return c.JSON(http.StatusInternalServerError, answer)
	}
	answer.Post_id = id
	return c.JSON(http.StatusCreated, answer)
}
func (srv *Server) createCommentHandler(c echo.Context) error {
	if c.Request().Method != http.MethodPost {
		return c.JSON(http.StatusMethodNotAllowed, map[string]string{"error": "method not allowed"})
	}

	var (
		comment models.Comment
	)
	answer := models.AnswerComment{Comment_id: -1}
	authHeader := c.Request().Header.Get("Authorization")
	if authHeader == "" || len(authHeader) < 8 {
		answer.Error = "необходимо предоставить заголовок авторизации"
		return c.JSON(http.StatusUnauthorized, answer)
	}
	tokenString := authHeader[7:]                    // Извлекаем токен из заголовка "Bearer <token>"
	claims, err := srv.uc.ValidationJWT(tokenString) // проверяем токен
	if err != nil {
		answer.Error = "невозможно верифицировать токен " + err.Error()
		return c.JSON(http.StatusUnauthorized, answer)
	}
	err = json.NewDecoder(c.Request().Body).Decode(&comment)
	if err != nil {
		answer.Error = err.Error()
		return c.JSON(http.StatusBadRequest, answer)
	}
	if comment.Author == "" || comment.Content == "" {
		answer.Error = "остались незаполненные поля"
		return c.JSON(http.StatusBadRequest, answer)
	}
	comment.Author = claims.UserName
	fmt.Println(claims.UserName)
	count, _ := srv.uc.CountOfPosts()
	if comment.Post_id < 0 || comment.Post_id > count {
		answer.Error = "несуществующий ID поста"
		return c.JSON(http.StatusInternalServerError, answer)
	}
	id, err := srv.uc.AddComment(comment)
	if err != nil {
		answer.Error = err.Error()
		return c.JSON(http.StatusInternalServerError, answer)
	}
	answer.Comment_id = id
	return c.JSON(http.StatusCreated, answer)
}

func (srv *Server) getPostsHandler(c echo.Context) error {
	var answer models.AnswerPagePosts
	queryParams := c.QueryParams()
	page, err := strconv.Atoi(queryParams.Get("page"))
	if err != nil {
		answer.Error = err.Error()
		c.JSON(http.StatusBadRequest, answer)
	}
	answer, err = srv.uc.GetPosts(page)
	if err != nil {
		answer.Error = err.Error()
		return c.JSON(http.StatusInternalServerError, answer)
	}
	return c.JSON(http.StatusOK, answer)
}

func (srv *Server) getCountOfPostsHandler(c echo.Context) error {
	var answer models.AnswerGetCountOfPosts
	id, err := srv.uc.CountOfPosts()
	answer.Count = id
	if err != nil {
		answer.Error = err.Error()
		return c.JSON(http.StatusInternalServerError, answer)
	}
	return c.JSON(http.StatusOK, answer)
}

func (srv *Server) getCommentsHandler(c echo.Context) error {
	var answer models.AnswerPageComments
	queryParams := c.QueryParams()
	page, err := strconv.Atoi(queryParams.Get("page"))
	if err != nil {
		answer.Error = err.Error()
		c.JSON(http.StatusBadRequest, answer)
	}
	post_id, err := strconv.Atoi(queryParams.Get("post_id"))
	if err != nil {
		answer.Error = err.Error()
		c.JSON(http.StatusBadRequest, answer)
	}
	answer, err = srv.uc.GetComments(page, post_id)
	if err != nil {
		answer.Error = err.Error()
		return c.JSON(http.StatusInternalServerError, answer)
	}
	return c.JSON(http.StatusOK, answer)
}

func (srv *Server) getPostById(c echo.Context) error {
	var answer models.AnswerPost
	queryParams := c.QueryParams()
	post_id, err := strconv.Atoi(queryParams.Get("post_id"))
	if err != nil {
		answer.Error = "Unable to get post_id"
		return c.JSON(http.StatusInternalServerError, answer)
	}
	answer, err = srv.uc.GetPostById(post_id)
	if err != nil {
		answer.Error = err.Error()
		return c.JSON(http.StatusInternalServerError, answer)
	}
	return c.JSON(http.StatusOK, answer)
}

func (srv *Server) deletePostById(c echo.Context) error {
	queryParams := c.QueryParams()
	post_id, err := strconv.Atoi(queryParams.Get("post_id"))

	if err != nil {
		return c.JSON(http.StatusOK, map[string]string{"error": err.Error()})
	}

	authHeader := c.Request().Header.Get("Authorization")
	if authHeader == "" || len(authHeader) < 8 {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "необходимо предоставить заголовок авторизации"})
	}
	tokenString := authHeader[7:]                    // Извлекаем токен из заголовка "Bearer <token>"
	claims, err := srv.uc.ValidationJWT(tokenString) // проверяем токен
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "невозможно верифицировать токен " + err.Error()})
	}

	login := claims.UserName

	err = srv.uc.DeletePostById(login, post_id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, map[string]string{"error": ""})
}

func (srv *Server) updatePost(c echo.Context) error {
	if c.Request().Method != http.MethodPatch {
		return c.JSON(http.StatusMethodNotAllowed, map[string]string{"error": "method not allowed"})
	}

	var (
		post models.Post
	)
	authHeader := c.Request().Header.Get("Authorization")
	if authHeader == "" || len(authHeader) < 8 {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Отсутсвует токен JWT"})
	}
	tokenString := authHeader[7:]                    // Извлекаем токен из заголовка "Bearer <token>"
	claims, err := srv.uc.ValidationJWT(tokenString) // проверяем токен
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "невозможно верифицировать токен " + err.Error()})
	}
	err = json.NewDecoder(c.Request().Body).Decode(&post)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid body request"})
	}
	if post.Title == "" || post.Content == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "остались незаполненные поля"})
	}
	post.Author = claims.UserName
	queryParams := c.QueryParams()
	post_id, err := strconv.Atoi(queryParams.Get("post_id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Не удалось получить номер поста"})
	}
	err = srv.uc.UpdatePost(post_id, post)
	if err != nil {
		if err.Error() == "автор поста не совпадает. невозможно редактирование" || err.Error() == fmt.Sprintf("пост с данным (%d) ID удален", post_id) {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, map[string]string{"error": ""})
}
