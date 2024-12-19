package provider

import "ReynokArsted/tic-tac-toe9x9/forum-service/internal/models"

func (p *Provider) AddPost(post models.Post) (int, error) {
	var id int
	query := "INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING id"
	err := p.UserDB.QueryRow(query, post.Title, post.Content, post.Author).Scan(&id)
	return id, err
}
