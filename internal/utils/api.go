package utils

import (
	"encoding/json"
	"net/http"
	"real-time-forum/internal/models"
)

func SendResponse(w http.ResponseWriter, resp models.Response) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(resp.Code)
	json.NewEncoder(w).Encode(resp)
}
