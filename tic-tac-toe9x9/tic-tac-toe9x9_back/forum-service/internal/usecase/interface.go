package usecase

import "ReynokArsted/tic-tac-toe9x9/forum-service/internal/models"

type Provider interface {
	AddPost(models.Post) (int, error)
}
