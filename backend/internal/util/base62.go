package util

import "strings"

const base62Chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func EncodeBase62(num int64) string {
	if num == 0 {
		return string(base62Chars[0]) // 'a'
	}
	var sb strings.Builder
	base := int64(len(base62Chars)) // 62

	// collect digits, least-significant first
	for num > 0 {
		remainder := num % base
		sb.WriteByte(base62Chars[remainder])
		num = num / base
	}

	// reverse to get correct order
	encoded := sb.String()
	runes := []rune(encoded)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}
