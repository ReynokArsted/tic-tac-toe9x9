package main

import (
	"flag"
	"log"

	"ReynokArsted/tic-tac-toe9x9/auth-service/internal/api"
	"ReynokArsted/tic-tac-toe9x9/auth-service/internal/config"
	"ReynokArsted/tic-tac-toe9x9/auth-service/internal/provider"
	"ReynokArsted/tic-tac-toe9x9/auth-service/internal/usecase"
)

func main() {
	configPath := flag.String("config-path", "../config/auth-service.yaml", "Path to configuration file")
	flag.Parse()

	cfg, err := config.LoadConfig(*configPath)
	if err != nil {
		log.Fatal(err)
	}

	prv := provider.NewProvider(cfg.DB.Host, cfg.DB.Port, cfg.DB.User, cfg.DB.Password, cfg.DB.DBname)
	uc := usecase.NewUsecase(prv)
	srv := api.NewServer(cfg.IP, cfg.Port, uc)
	srv.Run()
}
