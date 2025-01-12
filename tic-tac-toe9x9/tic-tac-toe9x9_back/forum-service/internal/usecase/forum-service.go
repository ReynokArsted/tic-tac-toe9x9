package usecase

import (
	"ReynokArsted/tic-tac-toe9x9/forum-service/internal/models"
	"fmt"

	"github.com/golang-jwt/jwt/v5"
)

func (u Usecase) AddPost(post models.Post) (int, error) {
	return u.p.AddPost(post)
}
func (u Usecase) AddComment(comment models.Comment) (int, error) {
	return u.p.AddComment(comment)
}

func (u Usecase) CountOfPosts() (int, error) {
	return u.p.CountOfPosts()
}

func (u Usecase) GetPosts(page int) (models.AnswerPagePosts, error) {
	return u.p.GetPosts(page)
}

func (u Usecase) GetComments(page, post_id int) (models.AnswerPageComments, error) {
	return u.p.GetComments(page, post_id)
}

func (u *Usecase) ValidationJWT(token_string string) (*models.Claims, error) {
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

func (u *Usecase) DeletePostById(post_id int) error {
	return u.p.DeletePostById(post_id)
}
