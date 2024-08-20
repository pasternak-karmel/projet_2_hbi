import axios from 'axios';

export const updateProduct = async (data: any) => {
  const response = await axios.put(`/api/products/${data.id}`, data);
  return response.data;
};
