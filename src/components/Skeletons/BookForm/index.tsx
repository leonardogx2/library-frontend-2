import SkeletonInputRef from '../Inputs/InputRef';
import SkeletonTextareaRef from '../Inputs/TextareaRef';
import SkeletonImageInput from '../Inputs/ImageInput';

const BookForm = () => {
  return (
    <div className="animate-pulse flex flex-col gap-8 mt-20">
      <div className="flex gap-10">
        <SkeletonImageInput />
        <div className="flex gap-6">
          <div className="flex flex-col h-40 justify-between">
            <SkeletonInputRef />
            <SkeletonTextareaRef />
          </div>
          <div className="flex flex-col h-44 gap-10">
            <SkeletonInputRef />
            <SkeletonInputRef />
            <SkeletonInputRef />
          </div>
        </div>
      </div>
      <div className="flex self-end gap-6">
        <span className="bg-skeleton-gray w-32 h-12 rounded"></span>
        <span className="bg-skeleton-gray w-32 h-12 rounded"></span>
      </div>
    </div>
  );
};

export default BookForm;
