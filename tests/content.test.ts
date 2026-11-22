import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { installs, validateInstalls } from '../content/installs.ts';
import { addOns, packages, validatePackages } from '../content/packages.ts';
import { processSteps, validateProcess } from '../content/process.ts';
import { rebates, validateRebates } from '../content/rebates.ts';
import { dialFrames, savingsAssumptions, validateSavings } from '../content/savings.ts';
import { validateHours } from '../lib/hours.ts';
import { businessStructuredData, faqStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields and valid hours', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length >= 4, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  assert.ok(business.serviceArea.length >= 3, 'business.serviceArea: expected regions');
  assert.match(business.sampleNotice, /Sample business for the Jamstacks gallery/);
  assert.doesNotThrow(() => validateHours(business.hours));
});

test('packages and add-ons pass validation and invalid edits name the offending id', () => {
  assert.doesNotThrow(() => validatePackages(packages, addOns));

  // Duplicate ID names the ID
  assert.throws(
    () => validatePackages([...packages, { ...packages[0], featured: false }], addOns),
    /sunrise-6-6/,
  );

  // Price outside [1000, 40000] names the ID
  assert.throws(
    () => validatePackages(packages.map(p => (p.id === 'golden-hour' ? { ...p, fromPriceAud: 950 } : p)), addOns),
    /golden-hour/,
  );
  assert.throws(
    () => validatePackages(packages.map(p => (p.id === 'long-evening' ? { ...p, fromPriceAud: 45000 } : p)), addOns),
    /long-evening/,
  );

  // kW mismatch > 2% from panelCount * panelWatts / 1000 names the ID
  assert.throws(
    () => validatePackages(packages.map(p => (p.id === 'midday-10' ? { ...p, systemKw: 9.0 } : p)), addOns),
    /midday-10/,
  );

  // Kind / battery / panel consistency names the ID
  assert.throws(
    () => validatePackages(packages.map(p => (p.id === 'sunrise-6-6' ? { ...p, batteryKwh: 5 } : p)), addOns),
    /sunrise-6-6/,
  );
  assert.throws(
    () => validatePackages(packages.map(p => (p.id === 'nightlight' ? { ...p, systemKw: 3.3, panelCount: 8, panelWatts: 415 } : p)), addOns),
    /nightlight/,
  );
  assert.throws(
    () => validatePackages(packages.map(p => (p.id === 'golden-hour' ? { ...p, batteryKwh: 0 } : p)), addOns),
    /golden-hour/,
  );

  // Featured count must be exactly 3 and none unavailable
  assert.throws(
    () => validatePackages(packages.map(p => (p.id === 'sunrise-6-6' ? { ...p, featured: false } : p)), addOns),
    /expected exactly 3 featured/,
  );
  assert.throws(
    () => validatePackages(packages.map(p => (p.id === 'golden-hour' ? { ...p, availability: 'unavailable' } : p)), addOns),
    /golden-hour/,
  );

  // Add-on prices must be positive and name the offending id
  assert.throws(
    () => validatePackages(packages, addOns.map(a => (a.id === 'bird-mesh' ? { ...a, priceAud: 0 } : a))),
    /bird-mesh/,
  );
});

test('recent installs reference real packages and valid YYYY-MM months', () => {
  assert.doesNotThrow(() => validateInstalls(installs, packages));
  assert.throws(
    () => validateInstalls(installs.map(i => (i.id === 'stirling-2026-09' ? { ...i, packageId: 'missing-pkg' } : i)), packages),
    /stirling-2026-09/,
  );
  assert.throws(
    () => validateInstalls(installs.map(i => (i.id === 'prospect-2026-09' ? { ...i, month: '2026-13' } : i)), packages),
    /prospect-2026-09/,
  );
});

test('rebates FAQ validates categories, unique IDs, review date and avoids current dollar rebate claims', () => {
  assert.doesNotThrow(() => validateRebates(rebates));
  assert.throws(
    () => validateRebates({ ...rebates, lastReviewed: '2026-02-30' }),
    /lastReviewed/,
  );
  assert.throws(
    () => validateRebates({
      ...rebates,
      faqs: rebates.faqs.map(f => (f.id === 'battery-vpp' ? { ...f, categoryId: 'unknown' } : f)),
    }),
    /battery-vpp/,
  );
  assert.throws(
    () => validateRebates({ ...rebates, faqs: [...rebates.faqs, rebates.faqs[0]] }),
    /what-are-stcs/,
  );
  for (const faq of rebates.faqs) {
    const joined = faq.answer.join(' ');
    assert.doesNotMatch(joined, /\$\d/, `rebates.faqs[${faq.id}]: must not state a dollar rebate amount as current fact`);
  }
});

test('savings assumptions, dial frames and install steps validate cleanly', () => {
  assert.doesNotThrow(() => validateSavings(savingsAssumptions, dialFrames));
  assert.doesNotThrow(() => validateProcess(processSteps));
  assert.throws(
    () => validateSavings({ ...savingsAssumptions, importRateAudPerKwh: 0 }, dialFrames),
    /importRateAudPerKwh/,
  );
  assert.throws(
    () => validateSavings(savingsAssumptions, [...dialFrames].reverse()),
    /time order/,
  );
});

test('structured data emits HomeAndConstructionBusiness offers and FAQPage derived from content', () => {
  const biz = businessStructuredData();
  assert.equal(biz['@type'], 'HomeAndConstructionBusiness');
  assert.equal(biz.areaServed.length, business.serviceArea.length);
  assert.equal(biz.openingHoursSpecification.length, 6);
  assert.equal(biz.makesOffer.length, packages.length);
  for (const offer of biz.makesOffer) {
    assert.equal(offer.priceCurrency, 'AUD');
    assert.ok(offer.price >= 1000);
  }
  const goldenOffer = biz.makesOffer.find(o => o.name === 'Golden Hour');
  assert.equal(goldenOffer?.price, packages.find(p => p.id === 'golden-hour')?.fromPriceAud);

  const faq = faqStructuredData();
  assert.equal(faq['@type'], 'FAQPage');
  assert.equal(faq.mainEntity.length, rebates.faqs.length);
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
