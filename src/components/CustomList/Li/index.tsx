interface ILi {
  children: React.ReactNode;
  left?: boolean;
  right?: boolean;
}

const Li = (props: ILi) => {
  const { children, right, left } = props;
  return (
    <li
      data-testid="li-test-id"
      className={`mt-4 border-b border-h_gray pb-2 ${left ? 'pl-10' : right ? 'pr-10' : ''}`}
    >
      {children}
    </li>
  );
};

export default Li;
