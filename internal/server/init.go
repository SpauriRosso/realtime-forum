package server

import (
	"fmt"
	"real-time-forum/internal/api"
	"time"
)

func InitServer() {
	// Create the HTTP server
	server := NewServer(":8080", 10*time.Second, 10*time.Second, 30*time.Second, 10*time.Second, 1<<20)

	// all api handlers
	server.Handle("/signup", api.SignUp)

	if err := server.Start(); err != nil {
		fmt.Printf("Error starting server: %v\n", err)
	}
}
