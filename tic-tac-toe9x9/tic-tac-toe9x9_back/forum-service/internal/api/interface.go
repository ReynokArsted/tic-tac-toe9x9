package api

import "ReynokArsted/tic-tac-toe9x9/forum-service/internal/models"

type Usecase interface {
	AddPost(models.Post) (int, error)
	AddComment(models.Comment) (int, error)
	CountOfPosts() (int, int, error)
	GetPosts(int) (models.AnswerPagePosts, error)
	GetComments(int, int) (models.AnswerPageComments, error)
	ValidationJWT(string) (*models.Claims, error)
	GetPostById(int) (models.AnswerPost, error)
	DeletePostById(string, int) error
	UpdatePost(int, models.Post) error
	DeleteCommentById(string, int) error
}
