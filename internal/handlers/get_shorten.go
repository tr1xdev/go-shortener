package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type GetShortenResponse struct {
	URL string `json:"url"`
}

func (h *Handler) GetShorten(w http.ResponseWriter, r *http.Request) {
	code := r.PathValue("code")

	url, err := h.Rdb.Get(r.Context(), code).Result()
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprintf(w, "specified key does not exists '%s', err: %v", code, err)
		return
	}

	var payload GetShortenResponse
	payload.URL = url

	res, err := json.Marshal(payload)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "failed to serialize JSON: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}
