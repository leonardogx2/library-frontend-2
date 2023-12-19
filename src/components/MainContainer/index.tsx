import React from 'react';

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-testid="main-container-test-id" className="bg-secondary p-2 sm:p-6 w-full h-screen">
      <div className="h-full grid grid-rows-home">
        <div className="h-20 w-full"></div>
        <div className="bg-white rounded flex justify-center items-center">{children}</div>
      </div>
    </div>
  );
};

export default MainContainer;
