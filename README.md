# go-shortener

A simple, fast URL shortener.

## Stack

* Go
* React (TypeScript)
* Redis
* MongoDB
* Docker

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/tr1xdev/go-shortener.git
cd go-shortener
```

### 2. Build and start services

```bash
docker compose up --build -d
```

### 3. Access the application

Open [http://localhost:5173](http://localhost:5173).

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

## Development

Run without Docker:

```bash
make run
```

Run lint, tests, and a build check:

```bash
make ci
```

## License

[MIT](LICENSE)
