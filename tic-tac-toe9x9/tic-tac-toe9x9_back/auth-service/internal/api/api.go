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
<<<<<<< HEAD
	srv.Server.GET("/singIn", srv.SingInHandler)
	srv.Server.GET("/singUp", srv.SingUpHandler)
=======
	srv.Server.POST("/singIn", srv.SingInHandler)
>>>>>>> c2702ba2 (Sing_in_auth)

	return srv
}

func (srv *Server) Run() {
	srv.Server.Logger.Fatal(srv.Server.Start(srv.Address))
}
