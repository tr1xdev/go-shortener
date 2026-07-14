package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/tr1xdev/go-shortener/internal/api"
	"github.com/tr1xdev/go-shortener/internal/database"
)

func main() {
	rdb := database.NewRedis(os.Getenv("REDIS_ADDR"), os.Getenv("REDIS_PASSWORD"), 1)
	mux := api.SetupRoutes(rdb)

	fmt.Println("app start on http://localhost:8181")

	log.Fatal(http.ListenAndServe(":8181", mux))
}
