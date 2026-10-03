import { Quattrocento } from 'next/font/google';

// Same face the site uses, exposed here so serif headings can sit inside
// system-font OS chrome.
export const serif = Quattrocento({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});
