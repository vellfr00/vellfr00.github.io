const PUBLIC_API_CACHED_FOLDER_URL = "/api__cache/";

export async function get_cached__apiResponse(cachedResponseFilePath: string) {
    const response = await fetch(PUBLIC_API_CACHED_FOLDER_URL + cachedResponseFilePath);
    return await response.json();
}