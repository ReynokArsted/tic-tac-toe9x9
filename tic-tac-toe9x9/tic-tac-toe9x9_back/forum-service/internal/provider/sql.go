package provider

import (
	"ReynokArsted/tic-tac-toe9x9/forum-service/internal/models"
	"database/sql"
	"errors"
	"fmt"
	"strconv"
)

func (p *Provider) AddPost(post models.Post) (int, error) {
	var id int
	query := "INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING id"
	err := p.UserDB.QueryRow(query, post.Title, post.Content, post.Author).Scan(&id)
	return id, err
}

func (p *Provider) CountOfPosts() (int, int, error) {
	var count, allcount int
	query := "SELECT COUNT(*) FROM posts WHERE is_deleted = FALSE"
	err := p.UserDB.QueryRow(query).Scan(&count)
	if err != nil {
		return 0, 0, err
	}
	query = "SELECT COUNT(*) FROM posts"
	err = p.UserDB.QueryRow(query).Scan(&allcount)
	if err != nil {
		return 0, 0, err
	}
	return allcount, count, nil
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
	query := "SELECT id, title, content, author FROM posts WHERE is_deleted = FALSE LIMIT $1 OFFSET $2"
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

	_, total, err := p.CountOfPosts()
	if err != nil {
		return models.AnswerPagePosts{}, errors.New("ошибка при получении количества записей: " + err.Error())
	}
	if total < offset {
		return models.AnswerPagePosts{
			Posts:    posts,
			Total:    total,
			PageSize: len(posts),
			Page:     page,
		}, errors.New(fmt.Sprintf("пустая страница"))
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
	query := "SELECT id, post_id,  author, content FROM comments WHERE is_deleted = FALSE AND post_id = $3 LIMIT $1 OFFSET $2"
	rows, err := p.UserDB.Query(query, 10, offset, post_id)
	if err != nil {
		return models.AnswerPageComments{}, err
	}
	defer rows.Close()

	for rows.Next() {
		var comment models.Comment
		err := rows.Scan(&comment.Comment_id, &comment.Post_id, &comment.Author, &comment.Content)
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
	if total < offset {
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
	query := "SELECT id, title, content, author, is_deleted FROM posts WHERE id = $1"
	row, err := p.UserDB.Query(query, post_id)

	if err != nil {
		return models.AnswerPost{}, err
	}

	defer row.Close()

	flag := false
	for row.Next() {
		err := row.Scan(&post.Post_id, &post.Title, &post.Content, &post.Author, &post.IsDeleted)
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

func (p *Provider) DeletePostById(login string, post_id int) error {
	post, err := p.GetPostById(post_id)

	if err != nil {
		return err
	}

	if post.Author != login {
		return errors.New("автор поста не совпадает. удаление невозможно")
	}

	query := "UPDATE posts SET is_deleted = TRUE WHERE id = $1 AND is_deleted = FALSE"
	result, err := p.UserDB.Exec(query, post_id)
	if err != nil {
		return err
	}
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		var isDeleted bool
		checkQuery := "SELECT is_deleted FROM posts WHERE id = $1"
		err = p.UserDB.QueryRow(checkQuery, post_id).Scan(&isDeleted)
		if errors.Is(err, sql.ErrNoRows) {
			return errors.New("Ошибка: пост с ID " + strconv.Itoa(post_id) + " не найден.")
		}
		if err != nil {
			return err
		}
		if isDeleted {
			return errors.New("Ошибка: пост с ID " + strconv.Itoa(post_id) + " уже удален. Обновите данные.")
		} else {
			return errors.New(fmt.Sprintf("unknown error when deleting post with id %d", post_id))
		}

	}
	return nil
}

func (p *Provider) UpdatePost(post_id int, post models.Post) error {
	postToUpdate, err := p.GetPostById(post_id)
	if err != nil {
		return err
	}
	if postToUpdate.IsDeleted {
		return errors.New(fmt.Sprintf("пост с данным (%d) ID удален", post_id))
	}
	if post.Author != postToUpdate.Author {
		return errors.New("автор поста не совпадает. невозможно редактирование")
	}
	query := "UPDATE posts SET title = $2, content = $3 WHERE id = $1"
	_, err = p.UserDB.Exec(query, post_id, post.Title, post.Content)
	return err
}

func (p *Provider) GetCommentById(comment_id int) (models.Comment, error) {
	var comment models.Comment
	query := "SELECT id, post_id, author, content, is_deleted FROM comments WHERE id = $1"
	row, err := p.UserDB.Query(query, comment_id)

	if err != nil {
		return models.Comment{}, err
	}

	defer row.Close()

	flag := false
	for row.Next() {
		err := row.Scan(&comment.Comment_id, &comment.Post_id, &comment.Author, &comment.Content, &comment.IsDeleted)
		if err != nil {
			return models.Comment{}, err
		}
		flag = true
	}

	if !flag {
		return models.Comment{}, errors.New(fmt.Sprintf("комментарий с данным (%d) ID не найден", comment_id))
	}

	return comment, nil
}

func (p *Provider) DeleteCommentById(login string, post_id int) error {
	comment, err := p.GetCommentById(post_id)

	if err != nil {
		return err
	}

	if comment.Author != login {
		return errors.New("автор комментария не совпадает. удаление невозможно")
	}

	query := "UPDATE comments SET is_deleted = TRUE WHERE id = $1 AND is_deleted = FALSE"
	result, err := p.UserDB.Exec(query, post_id)
	if err != nil {
		return err
	}
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		var isDeleted bool
		checkQuery := "SELECT is_deleted FROM comments WHERE id = $1"
		err = p.UserDB.QueryRow(checkQuery, post_id).Scan(&isDeleted)
		if errors.Is(err, sql.ErrNoRows) {
			return errors.New("Ошибка: пост с ID " + strconv.Itoa(post_id) + " не найден.")
		}
		if err != nil {
			return err
		}
		if isDeleted {
			return errors.New("Ошибка: комментарий с ID " + strconv.Itoa(post_id) + " уже удален. Обновите данные.")
		} else {
			return errors.New(fmt.Sprintf("unknown error when deleting post with id %d", post_id))
		}

	}
	return nil
}
