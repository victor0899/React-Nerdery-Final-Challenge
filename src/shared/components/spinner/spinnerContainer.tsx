import Spinner from './spinner';

interface SpinnerContainerProps {
  size?: 'sm' | 'md' | 'lg';
}

const SpinnerContainer = ({ size = 'md' }: SpinnerContainerProps) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner size={size} />
    </div>
  );
};

export default SpinnerContainer;