package handlers

import (
	"github.com/redis/go-redis/v9"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type Handler struct {
	Rdb *redis.Client
	db  *mongo.Database
}

func NewHandler(rdb *redis.Client, db *mongo.Database) *Handler {
	return &Handler{
		Rdb: rdb,
		db:  db,
	}
}
