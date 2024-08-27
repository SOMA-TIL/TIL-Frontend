import apiClient from '@services/api/axios';
import { ApiResponse } from '@type/api';
import { Category } from '@type/category';

export interface CategoryListData {
  categoryList: Category[];
}

export const getCategoryList = async (): Promise<ApiResponse<CategoryListData>> => {
  const response = await apiClient.get('/category');
  return response.data;
};
