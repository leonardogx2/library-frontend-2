import Image from 'next/image';

interface LentProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  toReturn?: boolean;
}

const LentButton = (props: LentProps) => {
  return (
    <button
      type="submit"
      data-testid={'button-' + (props.disabled ? 'disabled' : 'enabled') + '-test-id'}
      onClick={!props.disabled ? props.onClick : () => {}}
      className={`${
        !props.toReturn ? 'bg-primary' : ''
      } w-64 rounded border border-lent p-2 py-3 font-bold duration-100 hover:scale-95 hover:bg-opacity-80 flex items-center gap-3 justify-center ${
        props.disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${props.className}`}
    >
      <Image src={'/assets/img/lent-icon.png'} width={22} height={21} alt="Lent icon" />
      {props.toReturn ? 'Devolver' : 'Emprestar'}
    </button>
  );
};

export default LentButton;
