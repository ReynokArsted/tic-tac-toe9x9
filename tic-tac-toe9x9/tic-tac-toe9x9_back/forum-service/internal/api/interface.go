package api

import "ReynokArsted/tic-tac-toe9x9/forum-service/internal/models"

type Usecase interface {
	AddPost(models.Post) (int, error)
}
