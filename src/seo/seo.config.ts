import { PageSeo } from '@shared/types/seo.type';
import { environment } from './../environments/environment';

const APP_NAME = environment.appName;
const APP_DESCRIPTION =
  'StepnGO Club is a platform that helps Stepn GO users to calculate earnings and much more';
const APP_DOMAIN_URL = environment.appDomainUrl;

export const SEO_CONFIG = {
  appName: APP_NAME,
  appDescription: APP_DESCRIPTION,
  appDomainUrl: APP_DOMAIN_URL,
  author: 'Marius Oprea',
  defaultPageTitle: '',
  twitter: {
    site: '@stepngo_club',
    creator: '@dev_omr',
  },
  pages: {
    EARNINGS_CALCULATOR_PAGE: {
      title: 'Earnings Calculator',
      description: APP_DESCRIPTION,
      image: {
        url: 'assets/stepngoclub-cover.png',
        type: 'image/png',
        width: '1280',
        height: '720',
        alt: 'stepngoclub image cover',
      },
      url: '',
      priority: '1.0',
      changeFrequency: 'daily',
    },
    DASHBOARD_PAGE: {
      title: 'Dashboard',
      description: APP_DESCRIPTION,
      image: {
        url: 'assets/stepngoclub-cover.png',
        type: 'image/png',
        width: '1280',
        height: '720',
        alt: 'stepngoclub image cover',
      },
      url: 'dashboard',
      priority: '0.7',
      changeFrequency: 'daily',
    },
    CONVERTER_PAGE: {
      title: 'Converter',
      description: APP_DESCRIPTION,
      image: {
        url: 'assets/stepngoclub-cover.png',
        type: 'image/png',
        width: '1280',
        height: '720',
        alt: 'stepngoclub image cover',
      },
      url: 'converter',
      priority: '0.7',
      changeFrequency: 'daily',
    },
    CHEAT_SHEET_PAGE: {
      title: 'Cheat Sheet',
      description: APP_DESCRIPTION,
      image: {
        url: 'assets/stepngoclub-cover.png',
        type: 'image/png',
        width: '1280',
        height: '720',
        alt: 'stepngoclub image cover',
      },
      url: 'cheat-sheet',
      priority: '0.7',
      changeFrequency: 'daily',
    },
    GIFT_BAG_PAGE: {
      title: 'Gift Bag',
      description: APP_DESCRIPTION,
      image: {
        url: 'assets/stepngoclub-cover.png',
        type: 'image/png',
        width: '1280',
        height: '720',
        alt: 'stepngoclub image cover',
      },
      url: 'gift-bag',
      priority: '0.7',
      changeFrequency: 'daily',
    },
    ABOUT_PAGE: {
      title: 'About',
      description: APP_DESCRIPTION,
      image: {
        url: 'assets/stepngoclub-cover.png',
        type: 'image/png',
        width: '1280',
        height: '720',
        alt: 'stepngoclub image cover',
      },
      url: 'about',
      priority: '0.7',
      changeFrequency: 'daily',
    },
  } as { [key: string]: PageSeo },
};
