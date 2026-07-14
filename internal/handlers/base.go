package handlers

import "github.com/redis/go-redis/v9"

type Handler struct {
	Rdb *redis.Client
}

func NewHandler(rdb *redis.Client) *Handler {
	return &Handler{
		Rdb: rdb,
	}
}
