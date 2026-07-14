package main

import (
	"fmt"
	"log"
	"net/http"
)

func hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "hello")
}

func main() {
	http.HandleFunc("/", hello)
	fmt.Println("app start on http://localhost:8181")
	log.Fatal(http.ListenAndServe(":8181", nil))
}
