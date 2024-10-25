// apps/todo-app/src/app/components/Footer.tsx

import React from 'react';

type Props = {};

export const Footer: React.FC<Props> = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>© 2024 Todo App. All rights reserved.</p>
      <nav></nav>
    </footer>
  );
};
