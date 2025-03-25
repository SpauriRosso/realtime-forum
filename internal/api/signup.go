package api

import (
	"encoding/json"
	"net/http"
	"real-time-forum/internal/db"
	"real-time-forum/internal/models"

	"golang.org/x/crypto/bcrypt"
)

type Response struct {
	Code int
	Msg  []string
}

func SignUp(w http.ResponseWriter, r *http.Request) {
	var newUser models.User
	resp := Response{Code: 200}
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		resp.Code = 400
		resp.Msg = append(resp.Msg, err.Error())
	}

	password, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	if err != nil {
		resp.Code = 500
		resp.Msg = append(resp.Msg, err.Error())
	}

	code, err := db.CreateUser(newUser.Nickname, newUser.Age, newUser.Gender, newUser.FirstName, newUser.LastName, newUser.Email, string(password))
	if err != nil {
		resp.Code = code
		resp.Msg = append(resp.Msg, err.Error())
	}

	if resp.Code == 200 {
		resp.Msg = []string{"user created"}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]any{"code": resp.Code, "msg": resp.Msg})
}
