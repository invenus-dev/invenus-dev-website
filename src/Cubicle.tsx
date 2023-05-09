type Props = {
  text?: string;
};

const Cubicle = ({ text }: Props) => {
  const displayText = text || 'Cubicle';
  return (
    <div className="h-40 w-56 -rotate-6 transform pl-6 pt-6 font-mono font-semibold opacity-40">
      <span style={{ '--n': displayText.length } as React.CSSProperties}>{displayText}</span>
    </div>
  );
};

export default Cubicle;
