import React from 'react';
import { SelectionCell } from '../cells/SelectionCell';
import { SelectionHeaderCell } from '../cells/SelectionHeaderCell';
import { Column } from 'react-base-table';

type Props = {
  multiselect: any;
  selection: any;
  onSelect: (selection: any) => void | Promise<void>;
};

export const getSelectionColumn = ({ selection, multiselect, onSelect }: Props) => ({
  key: '__selection__',
  dataKey: '__selection__',
  rowKey: '@id',
  width: 30,
  flexShrink: 0,
  resizable: false,
  frozen: Column.FrozenDirection.LEFT,
  cellRenderer: ({ rowData }: any) => {
    const id = rowData['@id'];
    return <SelectionCell selection={selection} id={id} multiselect={multiselect} onSelect={onSelect} />;
  },
  headerRenderer: () => <SelectionHeaderCell selection={selection} multiselect={multiselect} onSelect={onSelect} />,
  dataSize: 10,
});
