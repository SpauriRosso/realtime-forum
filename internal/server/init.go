package server

import (
	"fmt"
	"time"
)

func InitServer() {
	// Create the HTTP server
	server := NewServer(":8080", 10*time.Second, 10*time.Second, 30*time.Second, 10*time.Second, 1<<20)

	// all api handlers
	// http.Handle("/create-user", api.)

	if err := server.Start(); err != nil {
		fmt.Printf("Error starting server: %v\n", err)
	}
}
