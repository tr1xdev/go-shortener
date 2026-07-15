# build stage
FROM golang:1.24 AS builder
WORKDIR /app

COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod \
    go mod download

COPY . .

RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 GOOS=linux go build -o app ./cmd/go-shortener

# final stage
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/app .

EXPOSE 8181
CMD ["./app"]
