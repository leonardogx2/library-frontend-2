export interface SkeletonTextareaRefProps {
  large?: boolean;
  small?: boolean;
}

const TextareaRef = (props: SkeletonTextareaRefProps) => {
  const { large, small } = props;
  return (
    <div className="group relative h-10 flex items-center">
      <span
        className={`pt-4 bg-skeleton-gray rounded py-3 pl-2 ${large ? 'w-96 h-40' : small ? 'w-72 h-28' : 'w-80 h-32'}`}
      ></span>
    </div>
  );
};

export default TextareaRef;
