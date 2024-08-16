import React from 'react';

import * as moment from 'moment';
import { ConfigProvider, theme } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';


// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
};

export const decorators = [
  (Story) => (
    <ConfigProvider
      locale={ruRu}
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#1DA57A', // '#1864FB', // primary color for all components  24 100 251
          //borderRadius: 2,
          fontSize: 12, // 14 // major text font size
          colorLink: '#1DA57A', //

          // Alias Token
          //colorBgContainer: '#f6ffed',

          algorithm: theme.compactAlgorithm,
        },
      }}>
      {Story()}
    </ConfigProvider>
  ),
];

moment.locale('ru');
moment.defaultFormat = 'LLL';
export const tags = ['autodocs'];
