const PUBLIC_API_CACHED_FOLDER_URL = "/api__cache/";

export async function get_cached__apiResponse(cachedResponseFilePath: string): Promise<any> {
    const response = await fetch(PUBLIC_API_CACHED_FOLDER_URL + cachedResponseFilePath);
    return await response.json();
}

export async function get__cached__apiResponse_lastModified(cachedResponseFilePath: string): Promise<string | null> {
    const response = await fetch(PUBLIC_API_CACHED_FOLDER_URL + cachedResponseFilePath);
    return response.headers.get("last-modified");
}