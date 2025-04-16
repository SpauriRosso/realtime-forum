package server

import (
	"fmt"
	"net/http"
	"real-time-forum/internal/api"
	"real-time-forum/internal/middlewares"
	"time"
)

func InitServer() {
	// Create the HTTP server
	server := NewServer(":8080", 10*time.Second, 10*time.Second, 30*time.Second, 10*time.Second, 1<<20)

	// static
	server.Handle("/", middlewares.StaticMiddleware(http.FileServer(http.Dir("static"))))

	// all api handlers
	server.Handle("/api/signup", api.SignUp)
	server.Handle("/api/signin", api.SignIn)
	server.Handle("/api/session", api.Session)
	server.Handle("/api/create-post", api.CreatePost)

	// middlewares
	server.Use(middlewares.ApiMiddleware)

	if err := server.Start(); err != nil {
		fmt.Printf("Error starting server: %v\n", err)
	}
}
