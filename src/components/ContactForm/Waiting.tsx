type Props = {
  text?: string;
};

const Waiting = ({ text = 'processing' }: Props) => (
  <div className="absolute left-1/2 top-1/2 z-10 -ml-16 -mt-8 flex h-16 w-48 items-center justify-center space-x-4 text-center">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-primary-light"></div>{' '}
    <div className="text-lg font-semibold text-primary-light">{text}</div>
  </div>
);

export default Waiting;
