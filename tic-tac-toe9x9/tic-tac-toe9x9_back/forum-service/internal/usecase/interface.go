package usecase

import "ReynokArsted/tic-tac-toe9x9/forum-service/internal/models"

type Provider interface {
	AddPost(models.Post) (int, error)
	AddComment(models.Comment) (int, error)
	CountOfPosts() (int, error)
	GetPosts(int) (models.AnswerPagePosts, error)
	GetComments(int, int) (models.AnswerPageComments, error)
	ValidationJWT(string) (*models.Claims, error)
}
