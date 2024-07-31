import { CSSProperties } from 'react';

export const convertSizeOptionToStyle = ({
  width,
  height,
}: {
  width: string | number;
  height: string | number;
}): CSSProperties => {
  const style: CSSProperties = {};
  if (height === 'all-empty-space') {
    style.flexGrow = 1;
  } else {
    style.height = height;
  }
  if (width === 'all-empty-space') {
    style.width = '100%';
  } else {
    style.width = width;
  }
  return style;
};
