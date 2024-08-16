import React from 'react';

import * as dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import LocaleData from 'dayjs/plugin/localeData';
import RelativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';

import { ConfigProvider, theme } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';

dayjs.extend(LocalizedFormat); // for longDateFormat
dayjs.extend(LocaleData); // for localeData()
dayjs.extend(RelativeTime); // for fromNow()

dayjs.locale('ru');

// for dayjs.defaultFormat
// see https://stackoverflow.com/questions/72681674/how-to-set-the-default-format-in-dayjs
const defaultFormat = 'LLL';
dayjs.extend((option, dayjsClass, dayjsFactory) => {
  const oldFormat = dayjsClass.prototype.format;

  dayjsClass.prototype.format = function (formatString) {
    return oldFormat.bind(this)(formatString ?? defaultFormat);
  };
});

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

export const tags = ['autodocs'];
