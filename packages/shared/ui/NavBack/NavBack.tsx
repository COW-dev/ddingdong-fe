import { Icon } from '../Icon';
import { Title1, Title3 } from '../Typography';

type Props = {
  /**
   * The title to display in the navigation back button.
   */
  title: string;
  /**
   * The size of the navigation back button.
   */
  size: 'sm' | 'lg';
  /**
   * Callback function to be called when the button is clicked.
   */
  onClick?: () => void;
};

export function NavBack({ title, size, onClick }: Props) {
  const handleClick = () => {
    if (onClick) {
      onClick?.();
      return;
    }

    window.history.back();
  };

  return (
    <button
      className="flex cursor-pointer flex-row items-center gap-2 align-middle whitespace-nowrap"
      onClick={handleClick}
    >
      {size === 'sm' ? (
        <>
          <Icon name="arrowLeft" className="w-4 md:w-6" />
          <Title3 className="whitespace-nowrap text-gray-500">{title}</Title3>
        </>
      ) : (
        <>
          <Icon name="arrowLeft" className="w-6 md:w-8" />
          <Title1 className="whitespace-nowrap text-gray-500">{title}</Title1>
        </>
      )}
    </button>
  );
}
