import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const ModalContainer = ({
  children,
  onClose,
  className,
  id,
}: {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  id?: string;
}) => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  const [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => setOpacity(0.1), 100);
    setTimeout(() => setOpacity(0.2), 120);
    setTimeout(() => setOpacity(0.3), 140);
    setTimeout(() => setOpacity(0.4), 160);
    setTimeout(() => setOpacity(0.5), 180);
    setTimeout(() => setOpacity(0.6), 200);
    setTimeout(() => setOpacity(0.7), 220);
    setTimeout(() => setOpacity(0.8), 240);
    setTimeout(() => setOpacity(0.9), 260);
    setTimeout(() => setOpacity(1), 280);
  }, []);

  return (
    <>
      <div
        key={id + '-key-' + new Date().toISOString()}
        data-testid={'modal-' + id + '-test-id'}
        className={`flex absolute top-10 opacity-${opacity} ${className} `}
      >
        <div className={`z-[60] bg-white m-auto shadow-2xl relative`}>
          <div className="bg-white">
            <div className={`bg-white duration-100 z-[80] w-full h-full`}>
              <Image
                className="absolute z-[90] right-4 top-4 cursor-pointer duration-100 hover:animate-pulse hover:scale-110"
                onClick={onClose}
                src={'/assets/icons/close.svg'}
                width={16}
                height={16}
                alt="Close icon"
              />
              {children}
            </div>
          </div>
        </div>
      </div>
      <div
        data-testid={'onclose-test-id-' + id}
        className="z-40 bg-black bg-opacity-70 w-full h-full top-0 left-0 fixed flex animate-smooth-opacity"
        onClick={onClose}
      ></div>
    </>
  );
};

export default ModalContainer;
