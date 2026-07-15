package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/tr1xdev/go-shortener/internal/api"
	"github.com/tr1xdev/go-shortener/internal/database"
)

func main() {
	rdb := database.NewRedis(os.Getenv("REDIS_ADDR"), os.Getenv("REDIS_PASSWORD"), 1)
	client, db := database.NewMongoDB(os.Getenv("MONGO_URI"), "go_shortener")

	defer func() {
		if err := client.Disconnect(context.Background()); err != nil {
			log.Printf("Error disconnecting from MongoDB: %v", err)
		}
	}()

	if err := db.CreateCollection(context.Background(), "urls"); err != nil {
		log.Fatalf("Failed to create collection: %v", err)
	}

	handler := api.SetupRoutes(rdb, db)

	fmt.Println("app start on http://localhost:8181")

	log.Fatal(http.ListenAndServe(":8181", handler))
}
