package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/tr1xdev/go-shortener/internal/util"
)

type CreateShortenRequest struct {
	URL string `json:"url"`
}

type CreateShortenResponse struct {
	Key string `json:"key"`
}

func (h *Handler) CreateShorten(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "could not read request body: %v", err)
		return
	}

	var req CreateShortenRequest
	if err := json.Unmarshal(body, &req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "invalid JSON: %v", err)
		return
	}

	randInt, err := util.RandomInt(3_521_614_606_208)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "failed to generate short url")
		return
	}

	key := util.EncodeBase62(randInt)

	if err := h.Rdb.Set(r.Context(), key, req.URL, time.Hour*6).Err(); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "internal db error")
		return
	}

	var res CreateShortenResponse
	res.Key = key

	json, err := json.Marshal(res)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "internal server error")
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(json)
}
