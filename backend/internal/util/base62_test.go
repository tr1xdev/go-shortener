package util

import "testing"

func TestEncodeBase62(t *testing.T) {
	tests := []struct {
		name     string
		input    int64
		expected string
	}{
		{"zero", 0, "a"},
		{"single digit max", 61, "9"},
		{"first two-char value", 62, "ba"},
		{"arbitrary value", 100, "bM"},
		{"large value", 999999, "emjb"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := EncodeBase62(tt.input)
			if result != tt.expected {
				t.Errorf("EncodeBase62(%d) = %q; want %q", tt.input, result, tt.expected)
			}
		})
	}
}

// regression test: catches the earlier bug where "for" was
// accidentally written as "if", truncating every result to 1 char
func TestEncodeBase62_ProducesMultipleCharsForLargeNumbers(t *testing.T) {
	result := EncodeBase62(999999)
	if len(result) <= 1 {
		t.Errorf("expected multi-character result for large number, got %q (len=%d)", result, len(result))
	}
}

func TestEncodeBase62_NoPanicOnValidInput(t *testing.T) {
	inputs := []int64{0, 1, 61, 62, 3843, 999999999}
	for _, n := range inputs {
		_ = EncodeBase62(n) // just ensure it doesn't panic
	}
}
