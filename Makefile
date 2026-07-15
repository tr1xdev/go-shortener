.PHONY: lint fmt fmt-fix test build build-check run run-back front-install front-dev docker-build docker-up docker-down clean ci

# check code with go vet
lint:
	go vet ./backend/...

# check formatting (fails if files are not formatted)
fmt:
	@if [ -n "$$(gofmt -l ./backend)" ]; then \
		echo "Code is not formatted, run 'make fmt-fix'"; \
		gofmt -l ./backend; \
		exit 1; \
	fi

# auto-fix formatting
fmt-fix:
	gofmt -w ./backend

# run all tests
test:
	go test ./backend/... -v

# build a real binary (useful for running it directly)
build:
	go build -o backend/app ./backend/cmd/go-shortener

# verify the code compiles, without leaving a binary behind
build-check:
	go build -o /dev/null ./backend/cmd/go-shortener

# run the app locally (without docker)
run:
	$(MAKE) -j2 run-back front-dev

# run backend locally
run-back:
	go run ./backend/cmd/go-shortener

# install frontend dependencies
front-install:
	cd frontend && npm install

# run frontend development server
front-dev:
	cd frontend && npm run dev

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
	rm -f backend/app

# run everything CI does, in order
ci: lint fmt test build-check
