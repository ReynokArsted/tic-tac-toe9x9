package provider

import (
	"ReynokArsted/tic-tac-toe9x9/forum-service/internal/models"
	"errors"
)

func (p *Provider) AddPost(post models.Post) (int, error) {
	var id int
	query := "INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING id"
	err := p.UserDB.QueryRow(query, post.Title, post.Content, post.Author).Scan(&id)
	return id, err
}

func (p *Provider) CountOfPosts() (int, error) {
	var count int
	query := "SELECT COUNT(*) FROM posts"
	err := p.UserDB.QueryRow(query).Scan(&count)
	if err != nil {
		return 0, err
	}
	return count, nil
}

func (p *Provider) AddComment(comment models.Comment) (int, error) {
	var id int
	query := "INSERT INTO comments (post_id, author, content) VALUES ($1, $2, $3) RETURNING id"
	err := p.UserDB.QueryRow(query, comment.Post_id, comment.Author, comment.Content).Scan(&id)
	return id, err
}

func (p *Provider) GetPosts(page int) (models.AnswerPage, error) {
	var posts []models.Post
	offset := (page - 1) * 10
	query := "SELECT id, title, content, author FROM posts LIMIT $1 OFFSET $2"
	rows, err := p.UserDB.Query(query, 10, offset)
	if err != nil {
		return models.AnswerPage{}, err
	}
	defer rows.Close()

	for rows.Next() {
		var post models.Post
		err := rows.Scan(&post.Id, &post.Title, &post.Content, &post.Author)
		if err != nil {
			return models.AnswerPage{}, err
		}
		posts = append(posts, post)
	}

	if err := rows.Err(); err != nil {
		return models.AnswerPage{}, errors.New("ошибка при сканировании строк: " + err.Error())
	}

	total, err := p.CountOfPosts()
	if err != nil {
		return models.AnswerPage{}, errors.New("ошибка при получении количества записей: " + err.Error())
	}
	if total < offset*10 {
		return models.AnswerPage{
			Posts:    posts,
			Total:    total,
			PageSize: len(posts),
			Page:     page,
		}, errors.New("пустая страница")
	}
	return models.AnswerPage{
		Posts:    posts,
		Total:    total,
		PageSize: len(posts),
		Page:     page,
	}, nil
}
