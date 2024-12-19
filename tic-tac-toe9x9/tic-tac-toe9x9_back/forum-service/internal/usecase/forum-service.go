package usecase

import (
	"ReynokArsted/tic-tac-toe9x9/forum-service/internal/models"
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
