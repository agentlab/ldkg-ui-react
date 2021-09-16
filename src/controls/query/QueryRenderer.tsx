import React from 'react';
import { withStoreToQueryProps } from '../../util/ContextToProps';
import { Query } from './Query';
import { rankWith, RankedTester, uiTypeIs } from '../../testers';

export const QueryRenderer = (props: any) => {
  return <Query {...props} />;
};

export const antdQueryTester: RankedTester = rankWith(2, uiTypeIs('Query'));
export default withStoreToQueryProps(QueryRenderer);
