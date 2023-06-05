import { SWRConfig } from 'swr';
import { fetcher } from '../utils/fetcher';
import { PropsWithChildren } from 'react';

const WithSvr = ({ children }: PropsWithChildren) => {
  const settings = {
    refreshInterval: 0,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    fetcher,
  };
  return <SWRConfig value={settings}>{children}</SWRConfig>;
};

export default WithSvr;
