import React from 'react';

type Props = {
  afterString: string;
  beforeString: string;
  searchValue: string;
};

export const FormattedTitle = ({ afterString, beforeString, searchValue }: Props) => (
  <span>
    {beforeString}
    <span className='site-tree-search-value'>{searchValue}</span>
    {afterString}
  </span>
);
