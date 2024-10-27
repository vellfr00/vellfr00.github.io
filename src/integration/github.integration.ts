import { get__cached__apiResponse_lastModified, get_cached__apiResponse } from "./api__cache.integration";

export type GitHubRepositoryInformation = {
  fullName: string;
  url: string;
  lastUpdate: Date;
  description?: string;
};

export async function getUserPublicRepositories(user: string): Promise<GitHubRepositoryInformation[] | null> {
  const GETUSERPUBLICREPOSITORIES_CACHE_FILE_PATH = `github/${user}/cached__getUserPublicRepositories.json`;
  const _cached__getUserPublicRepositories = await get_cached__apiResponse(GETUSERPUBLICREPOSITORIES_CACHE_FILE_PATH);

  if(_cached__getUserPublicRepositories) {
    let userRepositories: GitHubRepositoryInformation[] = _cached__getUserPublicRepositories.map((repository: any) => {
      return {
        fullName: repository.full_name,
        url: repository.html_url,
        lastUpdate: new Date(repository.updated_at),
        description: repository.description
      };
    });

    return userRepositories;
  }

  return null;
};

export async function getUserPublicRepositoriesLastModified(user: string): Promise<Date | null> {
  const GETUSERPUBLICREPOSITORIES_CACHE_FILE_PATH = `github/${user}/cached__getUserPublicRepositories.json`;
  const lastUpdateString = await get__cached__apiResponse_lastModified(GETUSERPUBLICREPOSITORIES_CACHE_FILE_PATH);
  return lastUpdateString ? new Date(lastUpdateString) : null;
}