// apps/todo-app/src/app/hooks/usePageFilter.ts

import { useRecoilState } from 'recoil';
import { selectedPageState } from '../../../../apps/todo-app/src/app/store/atomSetup';

export const usePageFilter = () => {
  const [currentPage, setCurrentPage] = useRecoilState(selectedPageState);

  // Function to update the current page
  const updatePageFilter = (page: string) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    updatePageFilter,
  };
};
