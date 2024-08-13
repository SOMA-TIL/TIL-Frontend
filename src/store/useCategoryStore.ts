import { getCategoryList } from '@services/api/categoryService';
import storeSupport from '@store/support';
import { Category } from '@type/category';

interface CategoryInfo {
  categoryList: Category[];
  setCategoryList: (categoryList: Category[]) => void;
  getCategoryList: () => Promise<Category[]>;
  transformCategoryTagList: (categoryIds: number[]) => string[];
}

const useCategoryStore = storeSupport<CategoryInfo>(
  (set, get) => ({
    categoryList: [],
    setCategoryList: (categoryList) => set({ categoryList }),
    getCategoryList: async () => {
      if (get().categoryList.length === 0) {
        const response = await getCategoryList();
        const categories = response.result?.categoryList || [];
        set({ categoryList: categories });
      }
      return get().categoryList;
    },
    transformCategoryTagList: (categoryIds: number[]) => {
      const categoryNames = categoryIds.map((id: number) => {
        const category = get().categoryList.find((c) => c.id === id);
        return category ? category.tag : 'Unknown';
      });
      return categoryNames;
    },
  }),
  'CATEGORY_STORE',
);

export default useCategoryStore;
