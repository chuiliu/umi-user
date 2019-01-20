import path from 'path';

// ref: https://umijs.org/config/
export default {
  // entry: ['src/app.js', 'src/test.js'],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'umi-user',
      dll: false,
      hardSource: false,
      routes: {
        exclude: [
          /components/,
        ],
      },
    }],
  ],
  alias: {
    '@': path.resolve(__dirname, './src'),
  }
}
