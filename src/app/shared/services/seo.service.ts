import { DOCUMENT } from '@angular/common';
import {
  inject,
  Inject,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from '@environment/environment';
import { SEO_CONFIG } from '@seo/seo.config';
import { PageSeo, ImageSeo } from '@shared/types/seo.type';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private rendererFactory = inject(RendererFactory2);

  private renderer: Renderer2;
  private canonicalLink: HTMLLinkElement;

  constructor(@Inject(DOCUMENT) private doc: Document) {
    // Add fixed meta tags which are the same for all pages
    this.addFixedTags();

    // add canonical link
    const canonicalLinkElement = this.doc.querySelector(
      'link[rel="canonical"]',
    );
    this.canonicalLink =
      (canonicalLinkElement as HTMLLinkElement) || this.createCanonicalLink();

    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  /**
   * Set SEO tags for a page
   *
   * @param key Page key
   */
  setPage(key: string): void {
    const pageSeo: PageSeo = SEO_CONFIG.pages[key];

    // set to title if found, else fall back to default
    this.setTitle(pageSeo.title || SEO_CONFIG.defaultPageTitle);

    // set description
    if (pageSeo.description) {
      this.setDescription(pageSeo.description);
    }

    // set image
    if (pageSeo.image) {
      this.setImage(pageSeo.image);
    }

    // reset canonical
    this.setUrl();
  }

  /**
   * Add structured data to the page
   *
   * @param json_ld
   */
  addStructuredData(json_ld: string) {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = json_ld;
    this.renderer.appendChild(document.head, script);
  }

  private addFixedTags(): void {
    // add general meta tags
    this.meta.addTag({
      name: 'robots',
      content:
        'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    });
    this.meta.addTag({ name: 'author', content: SEO_CONFIG.author });

    // add OpenGraph meta tags
    this.meta.addTag({
      property: 'og:site_name',
      content: SEO_CONFIG.appName,
    });
    this.meta.addTag({ property: 'og:type', content: 'website' });
    this.meta.addTag({ property: 'og:locale', content: 'en_US' });

    // add Twitter meta tags
    this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.addTag({
      name: 'twitter:site',
      content: SEO_CONFIG.twitter.site,
    });
    this.meta.addTag({
      name: 'twitter:creator',
      content: SEO_CONFIG.twitter.creator,
    });
  }

  /**
   * Set page title and title meta tags
   *
   * @param title Page title
   */
  protected setTitle(title: string): void {
    const titleValue = `${title} | ${environment.appName}`;

    this.title.setTitle(titleValue);
    this.meta.updateTag({
      name: 'title',
      content: titleValue,
    });
    this.meta.updateTag({
      property: 'og:title',
      content: titleValue,
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: titleValue,
    });
  }

  /**
   * Set page description meta tags
   *
   * @param description Page description
   */
  protected setDescription(description: string): void {
    this.meta.updateTag({
      name: 'description',
      content: description,
    });
    this.meta.updateTag({
      property: 'og:description',
      content: description,
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: description,
    });
  }

  /**
   * Set page image meta tags
   *
   * @param image ImageSeo object
   */
  protected setImage(image: ImageSeo): void {
    const imageUrl = `${environment.appDomainUrl}/${image.url}`;

    this.meta.updateTag({
      name: 'image',
      content: imageUrl,
    });
    this.meta.updateTag({
      property: 'og:image',
      content: imageUrl,
    });
    this.meta.updateTag({
      property: 'og:image:type',
      content: image.type,
    });
    this.meta.updateTag({
      property: 'og:image:width',
      content: image.width,
    });
    this.meta.updateTag({
      property: 'og:image:height',
      content: image.height,
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: imageUrl,
    });
    this.meta.updateTag({
      name: 'twitter:image:alt',
      content: image.alt,
    });
  }

  /**
   * Set page URL meta tags
   */
  protected setUrl(): void {
    const url = environment.appDomainUrl + this.doc.location.pathname;

    this.canonicalLink.setAttribute('href', url);
    this.meta.updateTag({ property: 'og:url', content: url });
  }

  private createCanonicalLink(): HTMLLinkElement {
    const link = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.doc.head.appendChild(link);

    return link;
  }
}
