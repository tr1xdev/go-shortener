package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/tr1xdev/go-shortener/internal/database"
	"github.com/tr1xdev/go-shortener/internal/util"
)

var rdb = database.NewRedis(os.Getenv("REDIS_ADDR"), os.Getenv("REDIS_PASSWORD"), 1)

type CreateShortenRequest struct {
	URL string `json:"url"`
}

type CreateShortenResponse struct {
	Key string `json:"key"`
}

type GetShortenResponse struct {
	URL string `json:"url"`
}

func shorten(w http.ResponseWriter, r *http.Request) {
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

	if err := rdb.Set(r.Context(), key, req.URL, time.Hour*6).Err(); err != nil {
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

func getShorten(w http.ResponseWriter, r *http.Request) {
	code := r.PathValue("code")

	url, err := rdb.Get(r.Context(), code).Result()
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

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /shorten", shorten)
	mux.HandleFunc("GET /shorten/{code}", getShorten)

	fmt.Println("app start on http://localhost:8181")

	log.Fatal(http.ListenAndServe(":8181", mux))
}
