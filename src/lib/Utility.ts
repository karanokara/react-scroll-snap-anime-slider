
export function add(a: number, b: number) {
    return a + b;
}

export function cn(...a: (string | boolean | undefined)[]) {
    return a.map((b) => {
        if (b === false) return null;
        return b;
    }).join(' ').replace(/\s+/g, ' ').trim();
}
