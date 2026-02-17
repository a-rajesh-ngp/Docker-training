
export const clamp = (value, min, max) => {
    const n = Number(value)||0
    return Math.min(max, Math.max(min, n))
}

export const clampInt = (value, min) => {
    const n = Number(value)||0
    return Math.max(min, Math.floor(n))
}