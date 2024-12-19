package api

import (
	"fmt"

	"github.com/labstack/echo/v4"
)

type Server struct {
	Server  *echo.Echo
	Address string
	uc      Usecase
}

func NewServer(ip string, port int, uc Usecase) *Server {
	srv := &Server{
		Server:  echo.New(),
		Address: fmt.Sprintf("%s:%d", ip, port),
		uc:      uc,
	}
	srv.Server.POST("/createPost", srv.createPostHandler)
	srv.Server.POST("/createComment", srv.createCommentHandler)
	srv.Server.GET("/getPosts", srv.getPostsHandler)
	srv.Server.GET("/getCountOfPosts", srv.getCountOfPostsHandler)

	return srv
}

func (srv *Server) Run() {
	srv.Server.Logger.Fatal(srv.Server.Start(srv.Address))
}
