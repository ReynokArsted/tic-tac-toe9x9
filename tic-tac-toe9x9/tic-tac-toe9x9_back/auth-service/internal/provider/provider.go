package provider

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

// провайдер с полем-указателем на структуру.
type Provider struct {
	UserDB *sql.DB
}

func NewProvider(host string, port int, user, password, dbName string) *Provider {
	psqlInfo := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbName)
	UserDB, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}

	if err = UserDB.Ping(); err != nil {
		log.Fatal(err)
	}
	// Создаем таблицу registred_users, если ее нет
	_, err = UserDB.Exec(`
        CREATE TABLE IF NOT EXISTS registred_users (
            id SERIAL PRIMARY KEY,
            login TEXT NOT NULL,
			password TEXT NOT NULL,
			username TEXT NOT NULL
			win INT NOT NULL,
			lose INT NOT NULL
        );
    `)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(444)
	return &Provider{UserDB: UserDB}
}
