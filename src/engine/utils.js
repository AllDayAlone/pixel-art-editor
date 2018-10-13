export function mirror([x, y]) {
    return [y, x];
}

export function normalize(x) {
    if (x > 0) return 1;
    if (x < 0) return -1;

    return 0;
}