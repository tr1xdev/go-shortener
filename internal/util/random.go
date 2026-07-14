package util

import (
	"crypto/rand"
	"math/big"
)

func RandomInt(maxExclusive int64) (int64, error) {
	n, err := rand.Int(rand.Reader, big.NewInt(maxExclusive))
	if err != nil {
		return 0, err
	}
	return n.Int64(), nil
}
