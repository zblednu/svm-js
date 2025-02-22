export function dotProd(A, B) {
	return A.reduce((sum, val, idx) => sum + val * B[idx], 0);
}
