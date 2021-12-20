import { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { getSelectionColumn } from '../components/columns/selectionColumn';
import { createColumn } from '../utils';
import { getSystemColumn } from '../components/columns/systemColumn';
import { getConfigMenuItems } from '../components/ConfigMenu';
import { createSort } from '../utils';
import { TypedObject } from '../types';

type ReturnShape = {
  visibleColumns: any[];
  setColumnsVisible: (indexes: any) => void;
};

export const useColumns = ({
  schemaProperties,
  viewKind,
  viewKindElement,
  viewDescr,
  viewDescrElement,
  selection,
  multiselect,
  order,
  onSelect,
}: any): ReturnShape => {
  const columnsHeightRef = useRef<TypedObject<number>>({});
  const [visibleColumns, setVisibleColumns] = useState<any>([]);

  const parsedColumns = useMemo(
    () =>
      Object.entries(schemaProperties).map(([property, propertySchema]) => {
        const test = createColumn({
          property,
          propertySchema,
          columnsHeight: columnsHeightRef.current,
          viewKind,
          viewKindElement,
          viewDescr,
          viewDescrElement,
        });
        return test;
      }),
    [schemaProperties, viewKind, viewKindElement, viewDescr, viewDescrElement],
  );
  //говно - надо поменять
  const setColumnsVisible = useCallback(
    (idxs: any) =>
      setVisibleColumns((prevVisibleColumns: any) => {
        const newVisibleColmns = [...prevVisibleColumns];
        idxs.forEach((e: any) => {
          const newData = Object.assign({}, newVisibleColmns[e.idx], { hidden: e.hidden });
          newVisibleColmns[e.idx] = newData;
        });
        return newVisibleColmns;
      }),
    [setVisibleColumns],
  );

  const menuItems = useMemo(
    () => getConfigMenuItems({ columns: parsedColumns, setColumnsVisible }),
    [parsedColumns, setColumnsVisible],
  );
  const systemColumn = useMemo(() => getSystemColumn({ menuItems }), [menuItems]);
  const selectionColumn = useMemo(
    () => getSelectionColumn({ selection, multiselect, onSelect }),
    [selection, multiselect, onSelect],
  );

  const columns = useMemo(
    () => [systemColumn, selectionColumn, ...visibleColumns],
    [systemColumn, selectionColumn, visibleColumns],
  );

  useEffect(() => {
    setVisibleColumns(() => {
      const visibleColumns = parsedColumns.filter((column) => !column.disabled);
      const customOrder = [...(order || [])];
      return visibleColumns.sort(createSort(customOrder.reverse()));
    });
  }, [parsedColumns, setVisibleColumns, order]);

  return { visibleColumns: columns, setColumnsVisible };
};
