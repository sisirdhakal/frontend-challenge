// apps/todo-app/src/app/hooks/usePageFilter.ts

import { useRecoilState } from 'recoil';
import { selectedPageState } from '@frontend-challenge/state';

export const usePageFilter = () => {
  const [currentPage, setCurrentPage] = useRecoilState(selectedPageState);

  // Function to update the current page
  const updatePageFilter = (page: string, type: string) => {
    setCurrentPage({ name: page, type });
  };

  return {
    currentPage,
    updatePageFilter,
  };
};
