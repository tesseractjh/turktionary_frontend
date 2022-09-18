const path = require('path');
const ReactRefreshTypescript = require('react-refresh-typescript');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.tsx',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@hoc': path.resolve(__dirname, 'src/hoc'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@recoil': path.resolve(__dirname, 'src/recoil'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack']
      },
      {
        test: /\.png$/i,
        use: [{ loader: 'file-loader' }]
      },
      {
        test: /\.[jt]sx?$/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
                '@babel/preset-env',
                '@babel/preset-typescript'
              ],
              plugins: [
                this.mode === 'development' && 'react-refresh/babel'
              ].filter(Boolean)
            }
          },
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before:
                  this.mode === 'development' ? [ReactRefreshTypescript()] : []
              })
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new Dotenv()]
};
