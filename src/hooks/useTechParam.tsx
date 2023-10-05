import { useEffect, useState } from 'react';
import { setUrlParameterValue, getParameterValue } from 'utils/paramRouter';

const useTechParam = () => {
  const initialTech = getParameterValue('tech', null);
  const [tech, setTech] = useState<string | null>(initialTech);

  const setCurrentTech = (hash: string | null) => {
    setTech(hash);
    setUrlParameterValue('tech', hash);
  };

  const historyUpdated = () => {
    const techParam = getParameterValue('tech', null);
    setTech(techParam);
  };

  useEffect(() => {
    window.addEventListener('popstate', historyUpdated);
    return () => {
      window.removeEventListener('popstate', historyUpdated);
    };
  }, []);

  return {
    currentTech: tech,
    setCurrentTech,
  };
};

export default useTechParam;
