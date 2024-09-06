import React from 'react';

import * as dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import LocaleData from 'dayjs/plugin/localeData';
import RelativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(LocalizedFormat); // for longDateFormat
dayjs.extend(LocaleData); // for localeData()
dayjs.extend(RelativeTime); // for fromNow()

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

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en_US',
    toolbar: {
      // The icon for the toolbar item
      icon: 'globe',
      // Array of options
      items: [
        { value: 'de_DE', title: 'Deutsch' },
        { value: 'en_US', title: 'English (USA)' },
        { value: 'it_IT', title: 'Italiano' },
        { value: 'pt_PT', title: 'Portugal' },
        { value: 'pt_BR', title: 'Portugal (Brasil)' },
        { value: 'ru_RU', title: 'Russian' },
      ],
      // Property that specifies if the name of the item will be displayed
      //showName: true,
      dynamicTitle: true,
    },
  },
  colorPrimary: {
    description: 'Primary color for components',
    defaultValue: '#1DA57A',
    toolbar: {
      title: 'Primary color',
      icon: 'circlehollow',
      items: [
        { value: '#1864FB', title: 'Blue' },
        { value: '#5A54F9', title: 'Violet' },
        { value: '#9E339F', title: 'Purple' },
        { value: '#ED4192', title: 'Pink' },
        { value: '#E0282E', title: 'Red' },
        { value: '#F4801A', title: 'Orange' },
        { value: '#F2BD27', title: 'Yellow' },
        { value: '#00B96B', title: 'Green' },
      ],
      // Property that specifies if the name of the item will be displayed
      //showName: true,
      dynamicTitle: true,
    },
  },
  themeDensity: {
    description: 'Theme layout density',
    defaultValue: 'compact',
    toolbar: {
      title: 'Theme Density',
      icon: 'expand',
      items: [
        { value: 'default', title: 'Default' },
        { value: 'compact', title: 'Compact' },
      ],
      // Property that specifies if the name of the item will be displayed
      //showName: true,
      dynamicTitle: true,
    },
  },
};
