import { apiClient } from '../../api/client';

export interface GetUrlResponse {
  url: string;
}

export const getOriginalUrl = (code: string) => {
  return apiClient.get<GetUrlResponse>(`/shorten/${code}`);
};
