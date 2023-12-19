'use client';
import { useContext, Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { BiError, BiCheck } from 'react-icons/bi';

interface IRadixToast {
  message?: string;
  severity: 'success' | 'fail';
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  onClose: () => void;
}

const MyToast = (props: IRadixToast) => {
  const { message, severity, setOpen, open, onClose } = props;
  if (!open) return <></>;

  return (
    <div className="fixed shadow-xl rounded top-2 right-2 w-72 min-h-[50px] bg-white animate-smooth-left z-[9999]">
      <div
        className={`flex gap-2 p-2 items-center w-full h-full min-h-[50px] rounded ${
          severity === 'success' ? 'bg-green-600 text-green-800' : 'bg-red text-rose-800'
        } bg-opacity-20 `}
      >
        <span className="ml-3">
          {severity === 'fail' ? <BiError className="w-8 h-8" /> : <BiCheck className="w-8 h-8" />}
        </span>
        <span className="text-md leading-4 tracking-tighter">{message}</span>
      </div>
    </div>
  );
};

interface MessageModal {
  content: string;
  severity: 'success' | 'fail';
}

interface MessageContextInterface {
  message: MessageModal;
  setMessage: Dispatch<SetStateAction<MessageModal>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

interface Props {
  children: JSX.Element;
}

const MessageContext = createContext<MessageContextInterface>({
  message: {
    content: '',
    severity: 'success',
  },
  open: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setMessage: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOpen: () => {},
});

const MessageProvider = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageModal>({
    content: '',
    severity: 'success',
  });
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(undefined);

  const onClose = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(undefined);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (message.content !== '') {
      setOpen(true);
      const newTimeoutId = setTimeout(() => {
        setOpen(false);
        message.content = '';
        setTimeoutId(undefined);
      }, 3500);
      setTimeoutId(newTimeoutId);
    }
  }, [open, message]);

  return (
    <MessageContext.Provider value={{ setMessage, setOpen, open, message }}>
      <MyToast message={message.content} setOpen={setOpen} open={open} severity={message.severity} onClose={onClose} />
      {props.children}
    </MessageContext.Provider>
  );
};

function useMessageContext() {
  const context = useContext(MessageContext);
  const { setMessage } = context;
  return { setMessage };
}

export { useMessageContext, MessageProvider };
