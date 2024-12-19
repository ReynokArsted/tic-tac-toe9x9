package models

type Post struct {
	Title   string `json:"title"`
	Content string `json:"content"`
	Author  string `json:"login"`
}
type Comment struct {
	Post_id int    `json:"post_id"`
	Author  string `json:"login"`
	Content string `json:"content"`
}
type Answer struct {
	Post_id int    `json:"post_id"`
	Error   string `json:"error"`
}
