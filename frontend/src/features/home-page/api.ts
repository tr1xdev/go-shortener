import { apiClient } from '../../api/client';

export interface ShortenResponse {
  key: string;
}

export const shortenUrl = (url: string) => {
  return apiClient.post<ShortenResponse>('/shorten', { url });
};
