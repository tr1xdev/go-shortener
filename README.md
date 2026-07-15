# go-shortener
A URL shortener written in Go

## Stack
- Go
- Redis
- MongoDB
- Docker

## Run
```bash
docker compose up --build -d
```

## API

**Create a short link**
```bash
curl -X POST http://localhost:8181/shorten \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

**Get the original URL**
```bash
curl http://localhost:8181/shorten/{code}
```

## Dev

```bash
make ci      # lint + test + build check
make run     # run without docker
```
