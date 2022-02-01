import React from 'react';

import moment from 'moment';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';

import 'antd/dist/antd.less';

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
};

export const decorators = [(Story) => <ConfigProvider locale={ruRu}>{Story()}</ConfigProvider>];

moment.locale('ru');
moment.defaultFormat = 'LLL';
