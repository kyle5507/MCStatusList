export const sleep = async (seconds: number) => {
    return new Promise(r => setTimeout(r, seconds * 1000))
}