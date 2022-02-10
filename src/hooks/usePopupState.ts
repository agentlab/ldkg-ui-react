import { useState, useCallback } from 'react';

export type Coords = {
  x: number;
  y: number;
};

export type Popup = {
  isPopupVisible: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  popupCoords: Coords;
  setPopupCoords: (coords: Coords) => void;
};
export const usePopupState = (initialState: any): Popup => {
  const [isPopupVisible, setPopupVisibility] = useState(initialState);
  const [popupCoords, setPopupCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const toggle = useCallback(() => setPopupVisibility((value: any) => !value), [setPopupVisibility]);
  const close = useCallback(() => setPopupVisibility(false), [setPopupVisibility]);
  const open = useCallback(() => setPopupVisibility(true), [setPopupVisibility]);

  return { isPopupVisible, toggle, close, open, popupCoords, setPopupCoords };
};
