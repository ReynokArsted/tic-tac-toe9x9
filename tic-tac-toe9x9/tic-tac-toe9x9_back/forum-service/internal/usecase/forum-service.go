package usecase

import (
	"ReynokArsted/tic-tac-toe9x9/forum-service/internal/models"
	"fmt"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

func (u Usecase) AddPost(post models.Post) (int, error) {
	return u.p.AddPost(post)
}
func (u Usecase) AddComment(comment models.Comment) (int, error) {
	return u.p.AddComment(comment)
}

func (u Usecase) CountOfPosts() (int, int, error) {
	return u.p.CountOfPosts()
}

func (u Usecase) GetPosts(page int) (models.AnswerPagePosts, error) {
	return u.p.GetPosts(page)
}

func (u Usecase) GetComments(page, post_id int) (models.AnswerPageComments, error) {
	return u.p.GetComments(page, post_id)
}

func (u *Usecase) ValidationJWT(c echo.Context) (*models.Claims, error) {
	cookie, err := c.Request().Cookie("token")
	if err != nil {
		return nil, fmt.Errorf("ошибка в cookie не обнаружен token или его извлечение неуспешно.")
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
		return nil, fmt.Errorf("ошибка при верификации токена %w", err)
	}

	if !token.Valid {
		return nil, fmt.Errorf("токен не действителен %w", jwt.ErrTokenSignatureInvalid)
	}
	return claims, nil
}

func (u *Usecase) GetPostById(post_id int) (models.AnswerPost, error) {
	return u.p.GetPostById(post_id)
}

func (u *Usecase) DeletePostById(login string, post_id int) error {
	return u.p.DeletePostById(login, post_id)
}

func (u *Usecase) UpdatePost(post_id int, post models.Post) error {
	return u.p.UpdatePost(post_id, post)
}

func (u *Usecase) DeleteCommentById(login string, post_id int) error {
	return u.p.DeleteCommentById(login, post_id)
}
