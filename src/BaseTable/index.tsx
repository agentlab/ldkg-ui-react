import React from 'react';
import { RankedTester, rankWith, uiTypeIs } from '../testers';

import { EditableTable } from './BaseTable';

export const BaseTableArrayControlRenderer = (props: any): JSX.Element => {
  return (props.schema && <EditableTable {...props} />) || <div />;
};

export const tableArrayControlTester: RankedTester = rankWith(3, uiTypeIs('aldkg:Array'));

export const tableRenderers: any[] = [
  {
    tester: tableArrayControlTester,
    renderer: BaseTableArrayControlRenderer,
  },
];
