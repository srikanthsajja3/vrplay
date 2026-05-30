import axiosInstance from './axiosInstance';

export interface KidsContent {
  id: number;
  name: string;
  image_url: string;
  link: string;
  ott_origin: string;
  age_group: string;
  is_active: number;
  created_at: string;
}

export interface KidsResponse {
  status: boolean;
  count: number;
  data: KidsContent[];
}

export const getKidsContents = async (): Promise<KidsContent[]> => {
  const response = await axiosInstance.get<KidsResponse>('/kids_content.php');
  return response.data.data;
};

export const getKidsContentById = async (id: string): Promise<KidsContent> => {
  const response = await axiosInstance.get<{ status: boolean; data: KidsContent }>(`/kids_content.php?id=${id}`);
  return response.data.data;
};

export const addKidsContent = async (content: Omit<KidsContent, 'id' | 'created_at'>): Promise<{ status: boolean; message: string }> => {
  const response = await axiosInstance.post('/kids_content.php', content);
  return response.data;
};

export const updateKidsContent = async (content: Omit<KidsContent, 'created_at'>): Promise<{ status: boolean; message: string }> => {
  const response = await axiosInstance.post('/kids_content.php', content);
  return response.data;
};

export const deleteKidsContent = async (id: number): Promise<{ status: boolean; message: string }> => {
  const response = await axiosInstance.delete(`/kids_content.php?id=${id}`);
  return response.data;
};

export const uploadKidsImage = async (file: File): Promise<{ status: boolean; message: string; image_url: string }> => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await axiosInstance.post('/upload_kids_image.php', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};
