package api

import (
	"net/http"

	"github.com/redis/go-redis/v9"
	"github.com/tr1xdev/go-shortener/internal/handlers"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

func SetupRoutes(rdb *redis.Client, db *mongo.Database) *http.ServeMux {
	h := handlers.NewHandler(rdb, db)
	mux := http.NewServeMux()

	mux.HandleFunc("POST /shorten", h.CreateShorten)
	mux.HandleFunc("GET /shorten/{code}", h.GetShorten)

	return mux
}
