package util

import "testing"

func TestRandomInt_WithinRange(t *testing.T) {
	max := int64(100)

	for range 1000 {
		n, err := RandomInt(max)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if n < 0 || n >= max {
			t.Errorf("RandomInt(%d) = %d; out of range [0, %d)", max, n, max)
		}
	}
}

func TestRandomInt_Distribution(t *testing.T) {
	max := int64(10)
	seen := make(map[int64]bool)

	// run enough iterations that we'd expect to see most values at least once
	for range 1000 {
		n, err := RandomInt(max)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		seen[n] = true
	}

	if len(seen) < int(max)/2 {
		t.Errorf("expected reasonable spread of values, only saw %d distinct values out of %d possible", len(seen), max)
	}
}

func TestRandomInt_NoErrorOnValidInput(t *testing.T) {
	_, err := RandomInt(1000000)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
}
