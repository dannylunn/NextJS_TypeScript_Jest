export type Cell = {
    row: number,
    column: number,
    unit?: number,
    unitPosition?: number,
    value?: number,
}

export type ErrorProps = {
    error: Error & { digest?: string },
    reset: () => void,
}
