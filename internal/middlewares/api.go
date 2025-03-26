package middlewares

import (
	"encoding/json"
	"net/http"
	"real-time-forum/internal/models"
	"strings"
)

func ApiMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Si, sur les routes en /api/... la method n'est pas POST = error 405
		if strings.HasPrefix(r.URL.Path, "/api/") && r.Method != http.MethodPost {
			resp := models.Response{Code: 405, Msg: []string{"Method Not Allowed"}}
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusMethodNotAllowed)
			json.NewEncoder(w).Encode(resp)
			return
		}
		// Sinon
		next.ServeHTTP(w, r)
	})
}
