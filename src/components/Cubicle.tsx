import { useEffect, useState, useRef } from 'react';

type Props = {
  text?: string;
};

const SCROLL_OFFSET = 200;

const splitTextIntoTwo = (text: string, index: number) => [text.slice(0, index), text.slice(index)];

const Cubicle = ({ text }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const displayText = text || 'Cubicle';
  const [movingIndex, setMovingIndex] = useState<number>(-1);
  const [text1, text2] = splitTextIntoTwo(displayText, movingIndex);
  const isFinished = movingIndex === displayText.length;
  const blinkStyle = { animation: 'blink 1s steps(1) infinite' };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const isInView =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) - SCROLL_OFFSET &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth);
      if (isInView) {
        setMovingIndex(0);
        window.removeEventListener('scroll', handleScroll);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (movingIndex < 0) return;
    let timeout: null | ReturnType<typeof setTimeout> = null;
    if (movingIndex < displayText.length) {
      timeout = setTimeout(() => {
        setMovingIndex((movingIndex) => movingIndex + 1);
      }, 20);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [displayText, movingIndex]);

  return (
    <div
      ref={ref}
      className="h-40 w-56 -rotate-6 transform pl-6 pt-6 font-mono font-semibold opacity-40"
    >
      {movingIndex > -1 ? (
        <>
          <span className="text-white">
            {isFinished ? text1 : text1.slice(0, text1.length - 1)}
          </span>
          {isFinished ? (
            <span className="bg-white text-black" style={blinkStyle}>
              &nbsp;
            </span>
          ) : (
            <span className="bg-white text-black">
              {text1.slice(text1.length - 1, text1.length)}
            </span>
          )}
          <span className="text-transparent">{text2}</span>
        </>
      ) : (
        <span className="bg-white text-black" style={blinkStyle}>
          &nbsp;
        </span>
      )}
    </div>
  );
};

export default Cubicle;
