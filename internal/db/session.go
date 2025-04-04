package db

import (
	"fmt"
	"net/http"

	"github.com/mattn/go-sqlite3"
)

func CreateSession(sessionUUID, userUUID string) (int, error) {
	db := GetDB()
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		return http.StatusInternalServerError, err
	}

	stmt, err := tx.Prepare("INSERT INTO sessions(uuid, user) VALUES(?, ?)")
	if err != nil {
		return http.StatusInternalServerError, err
	}
	defer stmt.Close()

	_, err = stmt.Exec(sessionUUID, userUUID)
	if err != nil {
		tx.Rollback()
		if sqliteErr, ok := err.(sqlite3.Error); ok && sqliteErr.ExtendedCode == sqlite3.ErrConstraintUnique {
			return http.StatusConflict, fmt.Errorf("%v", "The session already exists!")
		}
		return http.StatusInternalServerError, err
	}

	err = tx.Commit()
	if err != nil {
		return http.StatusInternalServerError, err
	}

	return http.StatusOK, nil
}

func ClearSession(userUUID string) {
	db := GetDB()
	defer db.Close()

	db.Exec(`DELETE FROM sessions WHERE user = ?`, userUUID)
}
