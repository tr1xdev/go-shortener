.PHONY: lint fmt fmt-fix test build build-check run docker-build docker-up docker-down clean ci

# check code with go vet
lint:
	go vet ./...

# check formatting (fails if files are not formatted)
fmt:
	@if [ -n "$$(gofmt -l .)" ]; then \
		echo "Code is not formatted, run 'make fmt-fix'"; \
		gofmt -l .; \
		exit 1; \
	fi

# auto-fix formatting
fmt-fix:
	gofmt -w .

# run all tests
test:
	go test ./... -v

# build a real binary (useful for running it directly)
build:
	go build -o app ./cmd/go-shortener

# verify the code compiles, without leaving a binary behind
build-check:
	go build -o /dev/null ./cmd/go-shortener

# run the app locally (without docker)
run:
	go run ./cmd/go-shortener

# build docker image
docker-build:
	docker compose build

# start everything via docker compose
docker-up:
	docker compose up --build -d

# stop everything
docker-down:
	docker compose down

# remove built binary
clean:
	rm -f app

# run everything CI does, in order
ci: lint fmt test build-check
