package api

import (
	"encoding/json"
	"net/http"
	"real-time-forum/internal/db"
	"real-time-forum/internal/models"

	"golang.org/x/crypto/bcrypt"
)

func SignUp(w http.ResponseWriter, r *http.Request) {
	var newUser models.User
	resp := models.Response{Code: http.StatusOK}

	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		resp.Code = http.StatusBadRequest
		resp.Msg = append(resp.Msg, err.Error())
	}

	if newUser.Nickname != "" && newUser.Age != "" && newUser.Gender != "" && newUser.FirstName != "" && newUser.LastName != "" && newUser.Email != "" && newUser.Password != "" {
		password, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
		if err != nil {
			resp.Code = http.StatusInternalServerError
			resp.Msg = append(resp.Msg, err.Error())
		}

		code, err := db.CreateUser(newUser.Nickname, newUser.Age, newUser.Gender, newUser.FirstName, newUser.LastName, newUser.Email, string(password))
		if err != nil {
			resp.Code = code
			resp.Msg = append(resp.Msg, err.Error())
		}
	} else {
		resp.Code = http.StatusBadRequest
		resp.Msg = append(resp.Msg, "All fields are required!")
	}

	if resp.Code == http.StatusOK {
		resp.Msg = []string{"User Created!"}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(resp.Code)
	json.NewEncoder(w).Encode(resp)
}
