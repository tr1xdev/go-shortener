package api

import (
	"net/http"

	"github.com/redis/go-redis/v9"
	"github.com/tr1xdev/go-shortener/internal/handlers"
)

func SetupRoutes(rdb *redis.Client) *http.ServeMux {
	h := handlers.NewHandler(rdb)
	mux := http.NewServeMux()

	mux.HandleFunc("POST /shorten", h.CreateShorten)
	mux.HandleFunc("GET /shorten/{code}", h.GetShorten)

	return mux
}
