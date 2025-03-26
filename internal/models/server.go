package models

import (
	"fmt"
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
	Port              string
	Routes            []Route
	Middlewares       []Middleware
	ReadTimeout       time.Duration
	WriteTimeout      time.Duration
	IdleTimeout       time.Duration
	ReadHeaderTimeout time.Duration
	MaxHeaderBytes    int
}

type Response struct {
	Code int
	Msg  []string
}

// Use adds a middleware to the server.
func (s *Server) Use(middleware Middleware) {
	s.Middlewares = append(s.Middlewares, middleware)
}

// Handle adds a route to the server.
func (s *Server) Handle(path string, handler http.HandlerFunc) {
	s.Routes = append(s.Routes, Route{Path: path, Handler: handler})
}

// Start launches the server on the specified port with the defined settings.
func (s *Server) Start() error {
	mux := http.NewServeMux()
	for _, route := range s.Routes {
		handler := route.Handler
		// Apply all middlewares to the handler
		for _, mw := range s.Middlewares {
			handler = mw(handler)
		}
		// Register the final handler with all middlewares applied
		mux.HandleFunc(route.Path, handler)
	}

	server := &http.Server{
		Addr:              s.Port,
		ReadTimeout:       s.ReadTimeout,
		WriteTimeout:      s.WriteTimeout,
		IdleTimeout:       s.IdleTimeout,
		ReadHeaderTimeout: s.ReadHeaderTimeout,
		MaxHeaderBytes:    s.MaxHeaderBytes,
		Handler:           mux,
	}
	fmt.Printf("Starting server on https://localhost%s\n", s.Port)
	return server.ListenAndServe()
}
