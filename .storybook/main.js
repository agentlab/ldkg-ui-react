const config = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  staticDirs: ['../stories/public'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
    'storybook-css-modules-preset',
    '@storybook/addon-webpack5-compiler-babel',
  ],

  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: false, // type-check stories during Storybook build
    reactDocgen: false, //'react-docgen-typescript',
  },
  docs: {},
};

export default config;
