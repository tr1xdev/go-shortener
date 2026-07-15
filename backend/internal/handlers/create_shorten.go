package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/tr1xdev/go-shortener/internal/util"
	"go.mongodb.org/mongo-driver/v2/bson"
)

type CreateShortenRequest struct {
	URL string `json:"url"`
}

type CreateShortenResponse struct {
	Key string `json:"key"`
}

type URL struct {
	ID          bson.ObjectID `bson:"_id,omitempty"`
	OriginalURL string        `bson:"original_url"`
	ShortCode   string        `bson:"short_code"`
}

func (h *Handler) CreateShorten(w http.ResponseWriter, r *http.Request) {
	var req CreateShortenRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		// failed to decode json
		log.Printf("failed to decode json: %v", err)
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.URL == "" {
		// url is empty
		http.Error(w, "url is required", http.StatusBadRequest)
		return
	}

	randInt, err := util.RandomInt(3_521_614_606_208)
	if err != nil {
		// failed to generate random int
		log.Printf("failed to generate random int: %v", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	key := util.EncodeBase62(randInt)

	if err := h.Rdb.Set(r.Context(), key, req.URL, time.Hour*6).Err(); err != nil {
		// redis error
		log.Printf("[redis]: failed to set key: %v", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	newURL := URL{
		ShortCode:   key,
		OriginalURL: req.URL,
	}

	_, err = h.db.Collection("urls").InsertOne(r.Context(), newURL)
	if err != nil {
		// mongo error, rollback redis key
		log.Printf("failed to insert document: %v", err)
		h.Rdb.Del(r.Context(), key)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(CreateShortenResponse{Key: key}); err != nil {
		// failed to serialize JSON
		log.Printf("failed to encode json: %v", err)
	}
}
