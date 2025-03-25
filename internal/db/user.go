package db

import (
	"fmt"

	"github.com/mattn/go-sqlite3"
)

func CreateUser(nickname, age, gender, firstName, lastName, email, password string) (int, error) {
	db := GetDB()
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		return 500, err
	}

	stmt, err := tx.Prepare("INSERT INTO users(nickname, age, gender, firstName, lastName, email, password) VALUES(?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		return 500, err
	}
	defer stmt.Close()

	_, err = stmt.Exec(nickname, age, gender, firstName, lastName, email, password)
	if err != nil {
		tx.Rollback()
		if sqliteErr, ok := err.(sqlite3.Error); ok && sqliteErr.ExtendedCode == sqlite3.ErrConstraintUnique {
			return 409, fmt.Errorf("%v", "The email address or nickname already exists!")
		}
		return 500, err
	}

	err = tx.Commit()
	if err != nil {
		return 500, err
	}

	return 200, nil
}
