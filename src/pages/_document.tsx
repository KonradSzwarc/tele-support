import NextDocument, { DocumentContext } from 'next/document';
import { ServerStyles, createStylesServer } from '@mantine/next';

const stylesServer = createStylesServer();

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <ServerStyles html={initialProps.html} server={stylesServer} />
        </>
      ),
    };
  }
}
