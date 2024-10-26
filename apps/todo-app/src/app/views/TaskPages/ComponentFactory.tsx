// apps/todo-app/src/app/config/searchFilterConfig.ts
import TodayPage from '../TodayPage';
import UpcomingPage from '../UpcomingPage';

export type SearchFilterConfig = {
  [key: string]: React.ComponentType;
};

export const pageConfig: SearchFilterConfig = {
  Today: TodayPage,
  Upcoming: UpcomingPage,
};

export const getPageComponent = (filter: string) => {
  return pageConfig[filter] || TodayPage;
};
