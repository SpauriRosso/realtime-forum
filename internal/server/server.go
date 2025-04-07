package server

import (
	"real-time-forum/internal/models"
	"time"
)

// NewServer creates a new instance of Server with specified configurations.
func NewServer(port string, readTimeout, writeTimeout, idleTimeout, readHeaderTimeout time.Duration, maxHeaderBytes int) *models.Server {
	return &models.Server{
		Port:              port,
		Routes:            []models.Route{},
		Middlewares:       []models.Middleware{},
		ReadTimeout:       readTimeout,
		WriteTimeout:      writeTimeout,
		IdleTimeout:       idleTimeout,
		ReadHeaderTimeout: readHeaderTimeout,
		MaxHeaderBytes:    maxHeaderBytes,
	}
}
