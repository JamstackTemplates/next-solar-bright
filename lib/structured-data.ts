import { business } from '../content/business.ts';
import { packages, type PackageAvailability } from '../content/packages.ts';
import { rebates } from '../content/rebates.ts';
import { absoluteUrl } from './paths.ts';

function schemaAvailability(availability: PackageAvailability): string {
  switch (availability) {
    case 'available':
      return 'https://schema.org/InStock';
    case 'limited':
      return 'https://schema.org/LimitedAvailability';
    case 'unavailable':
      return 'https://schema.org/OutOfStock';
  }
}

export function businessStructuredData() {
  const url = absoluteUrl('/');
  const packagesUrl = absoluteUrl('/packages/');

  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: business.name,
    description: business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.location.landmark,
      addressLocality: business.location.locality,
      addressRegion: business.location.region,
      postalCode: business.location.postalCode,
      addressCountry: business.location.country,
    },
    areaServed: business.serviceArea.map(area => ({
      '@type': 'AdministrativeArea',
      name: `${area.region} (${area.places})`,
    })),
    openingHoursSpecification: business.hours
      .filter(entry => entry.opens && entry.closes)
      .map(entry => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${entry.day}`,
        opens: entry.opens,
        closes: entry.closes,
      })),
    makesOffer: packages.map(pkg => ({
      '@type': 'Offer',
      name: pkg.name,
      description: `${pkg.bestFor}. From $${pkg.fromPriceAud.toLocaleString('en-AU')} AUD inc GST after the STC discount.`,
      price: pkg.fromPriceAud,
      priceCurrency: 'AUD',
      availability: schemaAvailability(pkg.availability),
      ...(packagesUrl ? { url: `${packagesUrl}#${pkg.id}` } : {}),
    })),
  };
}

export function faqStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: rebates.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.join(' '),
      },
    })),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
