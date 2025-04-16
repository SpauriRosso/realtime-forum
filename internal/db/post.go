package db

import (
	"database/sql"
	"net/http"

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
