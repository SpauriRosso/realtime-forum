package api

import (
	"encoding/json"
	"net/http"
	"real-time-forum/internal/db"
	"real-time-forum/internal/models"
	"real-time-forum/internal/utils"
)

func Session(w http.ResponseWriter, r *http.Request) {
	var input struct {
		SessionUUID string `json:"session_uuid"`
	}
	resp := models.Response{Code: http.StatusOK}

	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		resp.Code = http.StatusBadRequest
		resp.Msg = err.Error()
		utils.SendResponse(w, resp)
		return
	}

	user, err := db.SelectUserBySessionUUID(input.SessionUUID)
	if err != nil {
		resp.Code = http.StatusNotFound
		resp.Msg = err.Error()
		utils.SendResponse(w, resp)
		return
	}

	resp.Msg = "OK!"
	resp.Data = map[string]interface{}{"user": user}

	utils.SendResponse(w, resp)
}
