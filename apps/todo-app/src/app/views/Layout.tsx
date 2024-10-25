// apps/todo-app/src/app/views/Layout.tsx

import React, { useState } from 'react';
import { Sidebar, Footer, TaskDetails } from '@frontend-challenge/shared-ui';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

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
        {children}
        {selectedTask && (
          <TaskDetails
            task={selectedTask}
            // onClose={() => setSelectedTask(null)}
          />
        )}
      </main>
    </div>
  );
};

export default Layout;
