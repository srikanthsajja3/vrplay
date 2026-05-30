import axiosInstance from './axiosInstance';

export interface OttContent {
  id: string;
  name: string;
  image: string;
  thumbnail: string;
  link: string;
  type: 'live' | 'movie' | 'serial' | 'show' | 'sport';
  ottType: string;
  ottOrigin: 'Watcho' | 'Default';
  sso: 'SSO' | 'noSSO';
  category: string;
  order_number: number;
  episode_time: string | null;
  episode_end_time: string | null;
}

export interface OttResponse {
  status: boolean;
  count: number;
  data: OttContent[];
}

export const getOttContents = async (): Promise<OttContent[]> => {
  const response = await axiosInstance.get<OttResponse>('ott_content.php');
  return response.data.data;
};

export const getOttContentById = async (id: string): Promise<OttContent> => {
  const response = await axiosInstance.get<{ status: boolean; data: OttContent }>(`ott_content.php?id=${id}`);
  return response.data.data;
};

export const addOttContent = async (content: Omit<OttContent, 'id'>): Promise<{ status: boolean; message: string }> => {
  const response = await axiosInstance.post('ott_content.php', content);
  return response.data;
};

export const updateOttContent = async (content: OttContent): Promise<{ status: boolean; message: string }> => {
  const response = await axiosInstance.post('ott_content.php', content);
  return response.data;
};

export const deleteOttContent = async (id: string): Promise<{ status: boolean; message: string }> => {
  const response = await axiosInstance.delete(`ott_content.php?id=${id}`);
  return response.data;
};

export const uploadOttImage = async (file: File): Promise<{ status: boolean; message: string; image_url: string }> => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await axiosInstance.post('upload_ott_image.php', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};
