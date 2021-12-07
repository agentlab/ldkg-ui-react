import { useState, useCallback } from 'react';

export const usePopupState = (initialState: any) => {
  const [isPopupVisible, setPopupVisibility] = useState(initialState);
  const [popupCoords, setPopupCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const toggle = useCallback(() => setPopupVisibility((value: any) => !value), [setPopupVisibility]);
  const close = useCallback(() => setPopupVisibility(false), [setPopupVisibility]);
  const open = useCallback(() => setPopupVisibility(true), [setPopupVisibility]);

  return { isPopupVisible, toggle, close, open, popupCoords, setPopupCoords };
};
