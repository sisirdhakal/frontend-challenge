// apps/todo-app/src/app/views/Layout.tsx

import React, { useState } from 'react';
import { Sidebar, TaskDetails } from '@frontend-challenge/shared-ui';
import { useRecoilValue } from 'recoil';
import { selectedPageState } from '../store/atomSetup';
import { getPageComponent } from './TaskPages/ComponentFactory';

type Props = {};

const Layout: React.FC<Props> = (props: Props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const selectedPage = useRecoilValue(selectedPageState);

  // Getting the component based on the selected page
  const PageComponent = getPageComponent(selectedPage);

  return (
    <div className="flex min-h-screen p-6 rounded-md gap-5">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
      />
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'max-w-full' : 'max-w-3xl'
        }`}
      >
        <PageComponent />
      </main>
    </div>
  );
};

export default Layout;
