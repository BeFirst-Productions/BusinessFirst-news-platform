'use client';

import React from 'react';
import { SeoHeadProps, SITE_NAME } from './seo.types';

/**
 * <SeoHead> – injects all SEO-related <head> tags.
 *
 * Works with the Next.js App Router: since the App Router uses
 * generateMetadata() for static/SSR metadata, this component is
 * intended for CLIENT-SIDE updates (e.g. SPA transitions) where
 * you want to mutate <head> imperatively.
 *
 * For server-rendered pages the companion `buildMetadata()` helper
 * (see below) should be used in `generateMetadata()` instead.
 */
export function SeoHead({
  title,
  description,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  twitterCard = 'SUMMARY_LARGE_IMAGE',
  twitterTitle,
  twitterDescription,
  twitterImage,
  robots,
  extraMeta,
  structuredData,
}: SeoHeadProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const resolvedOgTitle     = ogTitle     ?? title;
  const resolvedOgDesc      = ogDescription ?? description;
  const resolvedTwitterTitle = twitterTitle ?? resolvedOgTitle;
  const resolvedTwitterDesc  = twitterDescription ?? resolvedOgDesc;
  const resolvedTwitterImg   = twitterImage ?? ogImage;

  React.useEffect(() => {
    // ── <title> ───────────────────────────────────────────
    document.title = fullTitle;

    const setMeta = (name: string, content: string, prop = false) => {
      const selector = prop
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let tag = document.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (prop) tag.setAttribute('property', name);
        else tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    const setLink = (rel: string, href: string) => {
      let tag = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!tag) {
        tag = document.createElement('link');
        tag.rel = rel;
        document.head.appendChild(tag);
      }
      tag.href = href;
    };

    // Core
    setMeta('description', description);
    if (robots)       setMeta('robots', robots);
    if (canonicalUrl) setLink('canonical', canonicalUrl);

    // Open Graph
    setMeta('og:title',       fullTitle,        true);
    setMeta('og:description', resolvedOgDesc,   true);
    setMeta('og:type',        'website',        true);
    if (canonicalUrl) setMeta('og:url',   canonicalUrl, true);
    if (ogImage)      setMeta('og:image', ogImage,      true);

    // Twitter
    const twCard = twitterCard === 'SUMMARY_LARGE_IMAGE' ? 'summary_large_image' : 'summary';
    setMeta('twitter:card',        twCard);
    setMeta('twitter:title',       resolvedTwitterTitle);
    setMeta('twitter:description', resolvedTwitterDesc);
    if (resolvedTwitterImg) setMeta('twitter:image', resolvedTwitterImg);

    // Extra custom meta
    extraMeta?.forEach(({ name, content }) => setMeta(name, content));

    // Structured data (JSON-LD)
    let ldScript = document.getElementById('seo-json-ld') as HTMLScriptElement | null;
    if (structuredData) {
      if (!ldScript) {
        ldScript = document.createElement('script');
        ldScript.id   = 'seo-json-ld';
        ldScript.type = 'application/ld+json';
        document.head.appendChild(ldScript);
      }
      ldScript.textContent = JSON.stringify(structuredData);
    } else if (ldScript) {
      ldScript.remove();
    }
  }, [
    fullTitle, description, canonicalUrl, robots,
    resolvedOgDesc, ogImage, twitterCard,
    resolvedTwitterTitle, resolvedTwitterDesc, resolvedTwitterImg,
    extraMeta, structuredData,
  ]);

  return null; // No visible output
}

