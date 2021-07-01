import React from 'react';

import { uiTypeIs, rankWith, RankedTester } from '../testers';
import { withStoreToCellProps } from '../util/ContextToProps';
import { Button } from 'antd';

export const AntdButtonCell = (props: any) => {
  const options = props.uiOptions;
  return (
    <Button size={'small'} style={options.style}>
      {options.label}
    </Button>
  );
};

/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const antdButtonCellTester: RankedTester = rankWith(2, uiTypeIs('Button'));

export const AntdButtonCellWithStore = withStoreToCellProps(AntdButtonCell);
