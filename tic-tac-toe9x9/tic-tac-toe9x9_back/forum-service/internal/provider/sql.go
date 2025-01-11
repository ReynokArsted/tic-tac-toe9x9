package provider

import (
	"ReynokArsted/tic-tac-toe9x9/forum-service/internal/models"
	"errors"
	"fmt"
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

func (p *Provider) GetPosts(page int) (models.AnswerPagePosts, error) {
	var posts []models.Post
	offset := (page - 1) * 10
	query := "SELECT id, title, content, author FROM posts LIMIT $1 OFFSET $2"
	rows, err := p.UserDB.Query(query, 10, offset)
	if err != nil {
		return models.AnswerPagePosts{}, err
	}
	defer rows.Close()

	for rows.Next() {
		var post models.Post
		err := rows.Scan(&post.Id, &post.Title, &post.Content, &post.Author)
		if err != nil {
			return models.AnswerPagePosts{}, err
		}
		posts = append(posts, post)
	}

	if err := rows.Err(); err != nil {
		return models.AnswerPagePosts{}, errors.New("ошибка при сканировании строк: " + err.Error())
	}

	total, err := p.CountOfPosts()
	if err != nil {
		return models.AnswerPagePosts{}, errors.New("ошибка при получении количества записей: " + err.Error())
	}
	if total < offset*10 {
		return models.AnswerPagePosts{
			Posts:    posts,
			Total:    total,
			PageSize: len(posts),
			Page:     page,
		}, errors.New("пустая страница")
	}
	return models.AnswerPagePosts{
		Posts:    posts,
		Total:    total,
		PageSize: len(posts),
		Page:     page,
	}, nil
}

func (p *Provider) CountOfComments(post_id int) (int, error) {
	var count int
	query := "SELECT COUNT(*) FROM comments WHERE post_id = $1"
	err := p.UserDB.QueryRow(query, post_id).Scan(&count)
	if err != nil {
		return 0, err
	}
	return count, nil
}

func (p *Provider) GetComments(page, post_id int) (models.AnswerPageComments, error) {
	var comments []models.Comment
	offset := (page - 1) * 10
	query := "SELECT post_id,  author, content FROM comments WHERE post_id = $3 LIMIT $1 OFFSET $2"
	rows, err := p.UserDB.Query(query, 10, offset, post_id)
	if err != nil {
		return models.AnswerPageComments{}, err
	}
	defer rows.Close()

	for rows.Next() {
		var comment models.Comment
		err := rows.Scan(&comment.Post_id, &comment.Author, &comment.Content)
		if err != nil {
			return models.AnswerPageComments{}, err
		}
		comments = append(comments, comment)
	}

	if err := rows.Err(); err != nil {
		return models.AnswerPageComments{}, errors.New("ошибка при сканировании строк: " + err.Error())
	}

	total, err := p.CountOfComments(post_id)
	if err != nil {
		return models.AnswerPageComments{}, errors.New("ошибка при получении количества записей: " + err.Error())
	}
	if total < offset*10 {
		return models.AnswerPageComments{
			Comments: comments,
			Total:    total,
			PageSize: len(comments),
			Page:     page,
		}, errors.New("пустая страница")
	}
	return models.AnswerPageComments{
		Comments: comments,
		Total:    total,
		PageSize: len(comments),
		Page:     page,
	}, nil
}

func (p *Provider) GetPostById(post_id int) (models.AnswerPost, error) {
	var post models.AnswerPost
	query := "SELECT id, title, content, author FROM posts WHERE id = $1"
	row, err := p.UserDB.Query(query, post_id)

	if err != nil {
		return models.AnswerPost{}, err
	}

	defer row.Close()

	flag := false
	for row.Next() {
		err := row.Scan(&post.Id, &post.Title, &post.Content, &post.Author)
		if err != nil {
			return models.AnswerPost{}, err
		}
		flag = true
	}

	if !flag {
		return models.AnswerPost{}, errors.New(fmt.Sprintf("Пост с данным (%d) ID не найден", post_id))
	}

	return post, nil
}
