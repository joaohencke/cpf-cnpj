import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import Popper from 'popper.js';
import withStore from '../webapp/withRedux';

if (process.browser) {
  window.$ = $;
  window.jQuery = $;
  window.Popper = Popper;
}
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withStore(MyApp);
