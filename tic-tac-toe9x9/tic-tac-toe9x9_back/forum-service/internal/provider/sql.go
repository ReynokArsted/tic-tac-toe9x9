package provider

import "ReynokArsted/tic-tac-toe9x9/forum-service/internal/models"

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
