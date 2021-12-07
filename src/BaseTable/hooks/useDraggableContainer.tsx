import React, { useRef, useMemo, useCallback } from 'react';

type ReturnShape = {
  tableRef: React.MutableRefObject<any>;
  getContainer: () => HTMLElement;
  getHelperContainer: () => HTMLElement;
  handleSortEnd: ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => void;
};

export const useDraggableContainer = (setData: any): ReturnShape => {
  const tableRef = React.useRef<any>();
  const getContainer = useCallback(
    () => tableRef.current?.getDOMNode().querySelector('.BaseTable__table-frozen-left .BaseTable__body'),
    [],
  );
  const getHelperContainer = useCallback(
    () => tableRef.current?.getDOMNode().querySelector('.BaseTable__table-frozen-left'),
    [],
  );

  const handleSortEnd = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      setData((oldData: any) => {
        const newData = [...oldData];
        const [removed] = newData.splice(oldIndex, 1);
        newData.splice(newIndex, 0, removed);
        return newData;
      });
    },
    [setData],
  );

  return { tableRef, getContainer, getHelperContainer, handleSortEnd };
};
