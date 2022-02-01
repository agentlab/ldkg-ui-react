import { useEffect, useMemo } from 'react';
import { SelectionStore } from '../models/SelectionStore';

type Props = {
  sourceData: any;
};

export const useSelection = ({ sourceData }: Props) => {
  const selection = useMemo(() => SelectionStore.create({ selection: {} }), []);

  useEffect(() => selection.setItems(sourceData), [sourceData, selection]);

  return { selection };
};
