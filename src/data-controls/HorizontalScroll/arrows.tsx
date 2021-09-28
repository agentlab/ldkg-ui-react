import React from 'react';

import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import './styles.css';

function Arrow({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
}) {
  return (
    <button disabled={disabled} onClick={onClick} className='arrow'>
      {children}
    </button>
  );
}

export function LeftArrow() {
  const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(!visibleItemsWithoutSeparators.length && isFirstItemVisible);
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollPrev()}>
      {'<'}
    </Arrow>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(!visibleItemsWithoutSeparators.length && isLastItemVisible);
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollNext()}>
      {'>'}
    </Arrow>
  );
}
