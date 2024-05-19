
import localFont from 'next/font/local'

export const Rubik = localFont({
    src: [
      {
        path: './Rubik-Regular.ttf',
        style: 'normal',
        weight: '400',
      },
      {
        path: './Rubik-Medium.ttf',
        style: 'normal',
        weight: '500',
      },
      // {
      //   path: './Rubik-SemiBold.ttf',
      //   style: 'normal',
      //   weight: '600',
      // },
      {
        path: './Rubik-Bold.ttf',
        style: 'normal',
        weight: '700',
      },
      {
        path: './Rubik-Black.ttf',
        style: 'normal',
        weight: '900',
      },
      {
        path: './Rubik-Italic.ttf',
        style: 'italic',
        weight: '400',
      },
      {
        path: './Rubik-MediumItalic.ttf',
        style: 'italic',
        weight: '500',
      },
      // {
      //   path: './Rubik-SemiBoldItalic.ttf',
      //   style: 'italic',
      //   weight: '600',
      // },
      {
        path: './Rubik-BoldItalic.ttf',
        style: 'italic',
        weight: '700',
      },
      {
        path: './Rubik-BlackItalic.ttf',
        style: 'italic',
        weight: '900',
      }
    ],
  })