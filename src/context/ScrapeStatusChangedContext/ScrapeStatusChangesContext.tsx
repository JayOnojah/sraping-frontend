import React, {
  FC,
  useState,
  ReactElement,
  createContext,
  PropsWithChildren,
} from 'react';

export const ScrapeStatusChangedContext = createContext({
  updated: false,
  toggle: () => {},
});

export const ScrapeStatusChangedContextProvider: FC<PropsWithChildren> = (
  props,
): ReactElement => {
  const [updated, setUpdated] = useState(false);

  function toggleHandler() {
    updated ? setUpdated(false) : setUpdated(true);
  }

  return (
    <ScrapeStatusChangedContext.Provider
      value={{ updated: updated, toggle: toggleHandler }}
    >
      {props.children}
    </ScrapeStatusChangedContext.Provider>
  );
};
