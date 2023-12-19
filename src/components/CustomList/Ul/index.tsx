import Image from 'next/image';

interface UlProps {
  children: React.ReactNode;
  left?: boolean;
  right?: boolean;
  title: string;
}

const Ul = (props: UlProps) => {
  const { children, left, right, title } = props;
  return (
    <div key={title + '-key'}>
      <div className="bg-primary p-2">
        <h4 className={`${left ? 'ml-10' : right ? 'mr-10' : ''} font-bold text-lg`}>{title}</h4>
      </div>
      <div>
        <div data-testid="ul-test-id" className={`border-b w-36 pb-2 mt-4 ${left ? 'ml-10' : right ? 'mr-10' : ''}`}>
          <button>
            <Image src={'/assets/img/order.png'} width={18} height={12} className="ml-2" alt="order icon" />
          </button>
        </div>
        <ul className="text-md border-t mt-2 border-h_gray">{children}</ul>
      </div>
    </div>
  );
};

export default Ul;
