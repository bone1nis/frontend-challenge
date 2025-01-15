export const useHttp = <T>() => {
    
    const request = async (url: string, method: string = "GET", body = null, headers: HeadersInit = {'Content-Type': 'application/json'}): Promise<T> => {
        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch(e: unknown) {
            if (e instanceof Error) {
                throw new Error(`HTTP request failed: ${e.message}`);
            } else {
                throw new Error(`Failed`);
            }
        }
    }

    return request;
}