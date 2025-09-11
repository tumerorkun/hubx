module.exports = {
  presets: ['module:@react-native/babel-preset', '@babel/preset-typescript'],
  plugins: [
    ['module-resolver', { alias: { '@': './src', '@assets': ['./assets'] } }],
    'react-native-worklets/plugin',
  ],
};
