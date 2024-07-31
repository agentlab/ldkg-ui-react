const config = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx)'],
  staticDirs: ['../stories/public'],


  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
    'storybook-css-modules-preset',
    {
      name: '@storybook/preset-ant-design',
      options: {
        lessOptions: {
          //see https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
          modifyVars: {
            'primary-color': '#1864FB', //'#1DA57A', // primary color for all components  24 100 251
            'font-size-base': '12px', // major text font size
            'link-color': '#1DA57A',
          },
        },
      },
    },
    '@storybook/addon-webpack5-compiler-babel'
  ],

  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: false, // type-check stories during Storybook build
    reactDocgen: false, //'react-docgen-typescript',
  },
  docs: {}
};

export default config;