package api

import (
	"encoding/json"
	"net/http"
	"real-time-forum/internal/db"
	"real-time-forum/internal/models"
	"real-time-forum/internal/utils"

	"github.com/gofrs/uuid"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(w http.ResponseWriter, r *http.Request) {
	var input models.User
	resp := models.Response{Code: http.StatusOK}

	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		resp.Code = http.StatusBadRequest
		resp.Msg = err.Error()
		utils.SendResponse(w, resp)
		return
	}

	if input.Nickname == "" || input.Age == "" || input.Gender == "" || input.FirstName == "" || input.LastName == "" || input.Email == "" || input.Password == "" {
		resp.Code = http.StatusBadRequest
		resp.Msg = "All fields are required!"
		utils.SendResponse(w, resp)
		return
	}

	userUUID, err := uuid.NewV7()
	if err != nil {
		resp.Code = http.StatusInternalServerError
		resp.Msg = err.Error()
		utils.SendResponse(w, resp)
		return
	}

	password, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		resp.Code = http.StatusInternalServerError
		resp.Msg = err.Error()
		utils.SendResponse(w, resp)
		return
	}

	code, err := db.CreateUser(userUUID.String(), input.Nickname, input.Age, input.Gender, input.FirstName, input.LastName, input.Email, string(password))
	if err != nil {
		resp.Code = code
		resp.Msg = err.Error()
		utils.SendResponse(w, resp)
		return
	}

	sessionUUID, err := uuid.NewV7()
	if err != nil {
		resp.Code = http.StatusInternalServerError
		resp.Msg = err.Error()
		utils.SendResponse(w, resp)
		return
	}

	code, err = db.CreateSession(sessionUUID.String(), userUUID.String())
	if err != nil {
		resp.Code = code
		resp.Msg = err.Error()
		utils.SendResponse(w, resp)
		return
	}

	resp.Msg = "User Created!"
	resp.Data = map[string]string{"session_uuid": sessionUUID.String()}

	utils.SendResponse(w, resp)
}
