package models

import "github.com/golang-jwt/jwt/v5"

type Post struct {
	Id      int    `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
	Author  string `json:"login"`
}

type Comment struct {
	Post_id int    `json:"post_id"`
	Author  string `json:"login"`
	Content string `json:"content"`
}

type AnswerPost struct {
	Post_id int    `json:"post_id"`
	Error   string `json:"error"`
}

type AnswerComment struct {
	Comment_id int    `json:"comment_id"`
	Error      string `json:"error"`
}

type AnswerGetCountOfPosts struct {
	Count int    `json:"count"`
	Error string `json:"error"`
}

type AnswerPagePosts struct {
	Posts    []Post `json:"posts"`
	Total    int    `json:"total"`
	PageSize int    `json:"page_size"`
	Page     int    `json:"page"`
	Error    string `json:"error"`
}

type AnswerPageComments struct {
	Comments []Comment `json:"comments"`
	Total    int       `json:"total"`
	PageSize int       `json:"page_size"`
	Page     int       `json:"page"`
	Error    string    `json:"error"`
}

type Claims struct {
	UserName string `json:"login"`
	jwt.RegisteredClaims
}

var JwtKey = []byte("verySecretKeyNobodyCan'tKnowThisAHAHAHAHAHAHA")
