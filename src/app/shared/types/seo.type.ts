export type ImageSeo = {
  url: string;
  type: string;
  width: string;
  height: string;
  alt: string;
};

export type PageSeo = {
  title: string;
  description?: string;
  image?: ImageSeo;
  url?: string;
  priority?: string;
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
};
