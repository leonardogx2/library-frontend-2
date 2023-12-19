import React from 'react';

interface SelectItemProps {
  onClick: () => void;
  text: string;
  size: string;
}

const SelectItem = (props: SelectItemProps) => {
  return (
    <div
      data-testid={props.text + '-test-id'}
      className={`${
        props.size === 'small' ? 'w-60' : props.size === 'large' ? 'w-96' : 'w-80'
      } p-2 bg-white hover:bg-light_gray cursor-pointer rounded`}
      onClick={props.onClick}
    >
      <p className="select-none">{props.text}</p>
    </div>
  );
};

export default SelectItem;
