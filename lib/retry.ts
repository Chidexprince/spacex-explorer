export function getRetryDelay(attemptIndex: number): number {
    return Math.min(1000 * 2 ** attemptIndex, 30_000);
}