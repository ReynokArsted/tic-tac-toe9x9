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
	// Создаем таблицу post, если ее нет
	_, err = UserDB.Exec(`
        CREATE TABLE IF NOT EXISTS posts (
 			id SERIAL PRIMARY KEY,
 			title VARCHAR(255) NOT NULL,
  			content TEXT NOT NULL,
  			author TEXT NOT NULL,
			is_deleted BOOLEN DEFAULT FALSE,
  			FOREIGN KEY (author) REFERENCES registred_users(login)
		);
    `)
	if err != nil {
		log.Fatal(err)
	}
	// Создаем таблицу comments, если ее нет
	_, err = UserDB.Exec(`
	CREATE TABLE IF NOT EXISTS comments (
		id SERIAL PRIMARY KEY,
		post_id INT NOT NULL,
		author TEXT NOT NULL,
		content TEXT NOT NULL,
		is_deleted BOOLEN DEFAULT FALSE,
		FOREIGN KEY (post_id) REFERENCES posts(id),
		FOREIGN KEY (author) REFERENCES registred_users(login)
	  );
	`)

	if err != nil {
		log.Fatal(err)
	}
	return &Provider{UserDB: UserDB}
}
