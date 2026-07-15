package handlers

import (
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/redis/go-redis/v9"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type GetShortenResponse struct {
	URL string `json:"url"`
}

func (h *Handler) GetShorten(w http.ResponseWriter, r *http.Request) {
	code := r.PathValue("code")

	url, err := h.Rdb.Get(r.Context(), code).Result()
	if err == nil {
		// redirect to original url
		http.Redirect(w, r, url, http.StatusFound)
		return
	}

	if !errors.Is(err, redis.Nil) {
		// any other error (network issue, timeout, redis unavailable, etc.)
		fmt.Printf("redis error: %v", err)
	}

	var result URL
	filter := bson.D{{Key: "short_code", Value: code}}
	if err := h.db.Collection("urls").FindOne(r.Context(), filter).Decode(&result); err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			// key does not exists
			http.Error(w, "short link not found", http.StatusNotFound)
			return
		}
		// any other error
		fmt.Printf("mongo error: %v", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	// save to redis for future requests
	_ = h.Rdb.Set(r.Context(), code, result.OriginalURL, time.Hour*6).Err()

	// redirect to original url
	http.Redirect(w, r, result.OriginalURL, http.StatusFound)
}
