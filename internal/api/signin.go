package api

import (
	"encoding/json"
	"net/http"
	"real-time-forum/internal/db"
	"real-time-forum/internal/models"

	"github.com/gofrs/uuid"
	"golang.org/x/crypto/bcrypt"
)

func SignIn(w http.ResponseWriter, r *http.Request) {
	var input models.User
	resp := models.Response{Code: http.StatusOK, Data: make(map[string]any)}

	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		resp.Code = http.StatusBadRequest
		resp.Msg = append(resp.Msg, err.Error())
	}

	if input.Login != "" && input.Password != "" {
		if user, err := db.SelectUserByLogin(input.Login); user != nil {
			if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)) == nil {
				id, err := uuid.NewV7()
				resp.Data["session"] = id.String()
				if err != nil {
					resp.Code = http.StatusInternalServerError
					resp.Msg = append(resp.Msg, err.Error())
				}
			} else {
				resp.Code = http.StatusUnauthorized
				resp.Msg = append(resp.Msg, "Wrong Password")
			}
		} else {
			resp.Code = http.StatusNotFound
			resp.Msg = append(resp.Msg, err.Error())
		}
	} else {
		resp.Code = http.StatusBadRequest
		resp.Msg = append(resp.Msg, "All fields are required!")
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(resp.Code)
	json.NewEncoder(w).Encode(resp)
}
