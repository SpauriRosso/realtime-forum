package middlewares

import (
	"net/http"
	"path/filepath"
	"strings"
)

func StaticMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Si l'utilisateur accède à la racine `/`, servir `index.html`
		if r.URL.Path == "/" {
			http.ServeFile(w, r, "static/index.html")
			return
		}
		// Liste des extensions de fichiers autorisées
		allowedExt := map[string]bool{
			".jpg": true, ".jpeg": true, ".png": true, ".gif": true,
			".css": true, ".js": true,
		}
		// Vérifiez l'extension du fichier demandé
		ext := strings.ToLower(filepath.Ext(r.URL.Path))
		if !allowedExt[ext] {
			// handle access prohibited
			http.Error(w, "Accès interdit", http.StatusForbidden) // tmp
			return
		}
		// Si l'extension est autorisée, servez le fichier
		next.ServeHTTP(w, r)
	})
}
