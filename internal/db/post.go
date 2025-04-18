package db

import (
	"database/sql"
	"log"
	"net/http"
	"real-time-forum/internal/models"

	"github.com/google/uuid"
)

func CreatePost(userUUID, parentUUID, content, category string) (int, error) {
	db := GetDB()
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		return http.StatusInternalServerError, err
	}

	stmt, err := tx.Prepare("INSERT INTO posts(uuid, user, parent, content, category) VALUES(?, ?, ?, ?, ?)")
	if err != nil {
		return http.StatusInternalServerError, err
	}
	defer stmt.Close()

	uuid := uuid.New().String()
	parent := sql.NullString{
		String: parentUUID,
		Valid:  parentUUID != "",
	}
	_, err = stmt.Exec(uuid, userUUID, parent, content, category)
	if err != nil {
		tx.Rollback()
		return http.StatusInternalServerError, err
	}

	err = tx.Commit()
	if err != nil {
		return http.StatusInternalServerError, err
	}

	return http.StatusOK, nil
}

func GetPosts() ([]models.Post, error) {
	db := GetDB()
	defer db.Close()

	query := `
	SELECT p.*, u.nickname, u.age, u.gender, u.firstName, u.lastName, u.email
	FROM posts p
	JOIN users u
	ON p.user = u.uuid
	ORDER BY p.created_at DESC;`

	rows, err := db.Query(query)
	if err != nil {
		log.Printf("Error executing query: %v", err)
		return nil, err
	}
	defer rows.Close()

	var posts []models.Post
	for rows.Next() {
		var post models.Post
		var parent sql.NullString
		err := rows.Scan(&post.UUID, &post.User.UUID, &parent, &post.Content, &post.Category, &post.Date, &post.User.Nickname, &post.User.Age, &post.User.Gender, &post.User.FirstName, &post.User.LastName, &post.User.Email)
		if err != nil {
			log.Printf("Error scanning row: %v", err)
			continue
		}
		if parent.Valid {
			post.Parent = &parent.String
		} else {
			post.Parent = nil
		}
		posts = append(posts, post)
	}
	if err = rows.Err(); err != nil {
		log.Printf("Error during row iteration: %v", err)
	}
	return posts, nil
}
