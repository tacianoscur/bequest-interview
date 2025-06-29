import { PlusIcon, TrashIcon, XIcon } from 'lucide-react';

interface IButtonProps {
  icon: 'plus' | 'trash';
  onClick: () => void;
  text: string;
}

const Button: React.FC<IButtonProps> = ({
  icon,
  onClick,
  text,
}: IButtonProps) => {
  return (
    <button
      className="bg-background text-secondary text-xs stroke-secondary hover:bg-secondary hover:text-background hover:stroke-background rounded-lg py-1 px-3 inline-flex items-center"
      onClick={onClick}
    >
      {icon === 'trash' ? (
        <TrashIcon className="w-4 h-4 mr-2" />
      ) : (
        <PlusIcon className="w-4 h-4 mr-2" />
      )}
      {text}
    </button>
  );
};

export default Button;
