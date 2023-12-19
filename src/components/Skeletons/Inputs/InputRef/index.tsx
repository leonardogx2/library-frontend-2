import React from 'react';

interface SkeletonInputRef {
  small?: boolean;
  large?: boolean;
}

const InputRef = (props: SkeletonInputRef) => {
  const { large, small } = props;
  return (
    <div className="group relative h-10 flex items-center">
      <span className={`h-12 bg-skeleton-gray rounded py-3 pl-2 ${small ? 'w-72' : large ? 'w-96' : 'w-80'}`} />
    </div>
  );
};

export default InputRef;
