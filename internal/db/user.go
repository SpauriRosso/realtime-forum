package db

import (
	"database/sql"
	"fmt"
	"net/http"
	"real-time-forum/internal/models"

	"github.com/mattn/go-sqlite3"
)

func CreateUser(nickname, age, gender, firstName, lastName, email, password string) (int, error) {
	db := GetDB()
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		return http.StatusInternalServerError, err
	}

	stmt, err := tx.Prepare("INSERT INTO users(nickname, age, gender, firstName, lastName, email, password) VALUES(?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		return http.StatusInternalServerError, err
	}
	defer stmt.Close()

	_, err = stmt.Exec(nickname, age, gender, firstName, lastName, email, password)
	if err != nil {
		tx.Rollback()
		if sqliteErr, ok := err.(sqlite3.Error); ok && sqliteErr.ExtendedCode == sqlite3.ErrConstraintUnique {
			return http.StatusConflict, fmt.Errorf("%v", "The email address or nickname already exists!")
		}
		return http.StatusInternalServerError, err
	}

	err = tx.Commit()
	if err != nil {
		return http.StatusInternalServerError, err
	}

	return http.StatusOK, nil
}

func SelectUserByID(id int) (*models.User, error) {
	db := GetDB()
	defer db.Close()

	user := &models.User{}
	err := db.QueryRow(`
	SELECT u.id, u.nickname, u.age, u.gender, u.firstName, u.lastName, u.email, u.password
	FROM users u
	WHERE id = ?`,
		id).Scan(&user.ID, &user.Nickname, &user.Age, &user.Gender, &user.FirstName, &user.LastName, &user.Email, &user.Password)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("%v", "User not Found!")
		}
		return nil, err
	}

	return user, nil
}

func SelectUserByNickname(nickname string) (*models.User, error) {
	db := GetDB()
	defer db.Close()

	user := &models.User{}
	err := db.QueryRow(`
	SELECT u.id, u.nickname, u.age, u.gender, u.firstName, u.lastName, u.email, u.password
	FROM users u
	WHERE nickname = ?`,
		nickname).Scan(&user.ID, &user.Nickname, &user.Age, &user.Gender, &user.FirstName, &user.LastName, &user.Email, &user.Password)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("%v", "User not Found!")
		}
		return nil, err
	}

	return user, nil
}

func SelectUserByEmail(email string) (*models.User, error) {
	db := GetDB()
	defer db.Close()

	user := &models.User{}
	err := db.QueryRow(`
	SELECT u.id, u.nickname, u.age, u.gender, u.firstName, u.lastName, u.email, u.password
	FROM users u
	WHERE email = ?`,
		email).Scan(&user.ID, &user.Nickname, &user.Age, &user.Gender, &user.FirstName, &user.LastName, &user.Email, &user.Password)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("%v", "User not Found!")
		}
		return nil, err
	}

	return user, nil
}

func SelectUserByLogin(login string) (*models.User, error) {
	user, err := SelectUserByEmail(login)
	if err != nil {
		user, err = SelectUserByNickname(login)
	}
	if err != nil {
		return nil, err
	}
	return user, nil
}
