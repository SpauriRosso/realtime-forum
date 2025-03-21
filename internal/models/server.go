package models

import (
	"net/http"
	"time"
)

// Middleware defines a function that takes an http.HandlerFunc and returns an http.HandlerFunc.
type Middleware func(http.HandlerFunc) http.HandlerFunc

// Route represents a route in the server.
type Route struct {
	Path    string
	Handler http.HandlerFunc
}

// Server represents our HTTP server.
type Server struct {
	port              string
	routes            []Route
	middlewares       []Middleware
	readTimeout       time.Duration
	writeTimeout      time.Duration
	idleTimeout       time.Duration
	readHeaderTimeout time.Duration
	maxHeaderBytes    int
}
