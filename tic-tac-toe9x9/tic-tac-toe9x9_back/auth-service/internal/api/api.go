package api

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
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
	srv.Server.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://127.0.0.1:3000"},
		AllowMethods:     []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
		AllowHeaders:     []string{"Content-Type", "Authorization", "Cookie"},
		AllowCredentials: true,
	}))
	srv.Server.POST("/singIn", srv.SingInHandler)
	srv.Server.POST("/singUp", srv.SingUpHandler)
	srv.Server.GET("/stayAuth", srv.StayAuth)

	return srv
}

func (srv *Server) Run() {
	srv.Server.Logger.Fatal(srv.Server.Start(srv.Address))
}
