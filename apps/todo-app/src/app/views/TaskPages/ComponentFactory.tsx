// apps/todo-app/src/app/config/searchFilterConfig.ts
import TodayPage from '../TodayPage';
import UpcomingPage from '../UpcomingPage';
import TaskPages from '.';

export type SearchFilterConfig = {
  [key: string]: React.ComponentType;
};

export const pageConfig: SearchFilterConfig = {
  Today: TodayPage,
  Upcoming: UpcomingPage,
  TaskPages: TaskPages,
};

export const getPageComponent = (name: string, type: string) => {
  if (type === 'Category') {
    return pageConfig['TaskPages'];
  } else return pageConfig[name] || TodayPage;
};
