import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const uploadAndAnalyzeDocument = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiClient.post('/analyze', formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading and analyzing document:', error);
    throw error;
  }
}; 