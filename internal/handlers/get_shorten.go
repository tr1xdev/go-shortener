package handlers

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/redis/go-redis/v9"
)

type GetShortenResponse struct {
	URL string `json:"url"`
}

func (h *Handler) GetShorten(w http.ResponseWriter, r *http.Request) {
	code := r.PathValue("code")

	url, err := h.Rdb.Get(r.Context(), code).Result()
	if err != nil {
		if errors.Is(err, redis.Nil) {
			// key does not exists
			http.Error(w, "short link not found", http.StatusNotFound)
			return
		}
		// any other error (network issue, timeout, redis unavailable, etc.)
		fmt.Printf("redis error: %v", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	var payload GetShortenResponse
	payload.URL = url

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(payload); err != nil {
		log.Printf("failed to serialize JSON: %v", err)
		return
	}
}
