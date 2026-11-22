export interface RebateCategory {
  /** Stable, URL-safe category anchor ID. */
  id: string;
  /** Visible category heading. */
  title: string;
  /** Short intro line under the category heading. */
  blurb: string;
}

export interface RebateFaq {
  /** Stable, URL-safe unique FAQ ID. */
  id: string;
  /** Must match an entry in categories. */
  categoryId: string;
  /** Plain-language question. */
  question: string;
  /** One or more answer paragraphs; never state a current rebate dollar amount as fact. */
  answer: string[];
}

export interface RebatesContent {
  /** ISO YYYY-MM-DD date; update whenever any rebate answer changes. */
  lastReviewed: string;
  /** Public government source link for current scheme rules. */
  officialSource: {
    name: string;
    url: string;
  };
  categories: RebateCategory[];
  faqs: RebateFaq[];
}

export const rebates: RebatesContent = {
  lastReviewed: '2026-11-14',
  officialSource: {
    name: 'Clean Energy Regulator',
    url: 'https://cer.gov.au',
  },
  categories: [
    {
      id: 'certificates',
      title: 'The federal solar discount',
      blurb: 'How Small-scale Technology Certificates (STCs) reduce the upfront price.',
    },
    {
      id: 'batteries',
      title: 'Batteries',
      blurb: 'Battery discounts, adding storage to existing solar and virtual power plants.',
    },
    {
      id: 'bills',
      title: 'Your bill and feed-in',
      blurb: 'Feed-in tariffs, South Australian export rules and smart meters.',
    },
    {
      id: 'paperwork',
      title: 'Finance and paperwork',
      blurb: 'Payment options, renting or strata approval and checking current rules.',
    },
  ],
  faqs: [
    {
      id: 'what-are-stcs',
      categoryId: 'certificates',
      question: 'What is the STC discount?',
      answer: [
        'Small-scale technology certificates are created for eligible solar systems under the federal Small-scale Renewable Energy Scheme.',
        'Installers usually apply them as a point-of-sale discount, so the discount is already taken off our “from” prices. Your written quote sets out the exact discount applied for your roof and system size.',
      ],
    },
    {
      id: 'stc-shrinking',
      categoryId: 'certificates',
      question: 'Is the discount getting smaller?',
      answer: [
        'Yes. The number of certificates created for a new system steps down each year until the scheme ends in 2030, so the same system earns a slightly smaller discount each January.',
        'The exact figure for your installation is calculated on the date we prepare your written quote.',
      ],
    },
    {
      id: 'stc-eligibility',
      categoryId: 'certificates',
      question: 'Do I have to do anything to get it?',
      answer: [
        'No paperwork for you. The system must use approved panels and inverters and be installed by an accredited installer, and we lodge the claim on your behalf.',
        'Your written quote confirms eligibility and shows the exact discount applied before you decide.',
      ],
    },
    {
      id: 'battery-discount',
      categoryId: 'batteries',
      question: 'Is there a discount on home batteries?',
      answer: [
        'A federal battery program provides a discount for eligible home batteries, also applied at the point of sale.',
        'The amount depends on usable battery capacity and changes over time. Your written quote lists the exact discount applied for your system.',
      ],
    },
    {
      id: 'battery-existing-solar',
      categoryId: 'batteries',
      question: 'Can I add a battery to the solar I already have?',
      answer: [
        'Usually yes, with an AC-coupled battery such as our Nightlight package.',
        'We check your existing inverter, switchboard and export limits first, then confirm compatibility and the exact discount applied in a written quote.',
      ],
    },
    {
      id: 'battery-vpp',
      categoryId: 'batteries',
      question: 'What is a virtual power plant?',
      answer: [
        'Some electricity retailers pay battery owners to share stored power with the grid at peak times.',
        'Joining a virtual power plant is completely optional, and we explain the trade-offs alongside the exact pricing and any eligible discounts in your written quote.',
      ],
    },
    {
      id: 'feed-in-tariff',
      categoryId: 'bills',
      question: 'What will I get paid for exported power?',
      answer: [
        'A feed-in tariff set by your electricity retailer, often only a few cents per kWh.',
        'That is why using your own solar power directly (or storing it in a battery) is worth much more than exporting it. Your quote models your bill using current retail assumptions, while your written quote also itemises any upfront point-of-sale discounts.',
      ],
    },
    {
      id: 'export-limits',
      categoryId: 'bills',
      question: 'Can my network limit how much I export?',
      answer: [
        'Yes. South Australian network rules can cap or dynamically vary how much power your inverter exports during sunny periods.',
        'We size and configure the inverter to comply with local network requirements, and detail any export settings and applicable discounts in your written quote.',
      ],
    },
    {
      id: 'meter-change',
      categoryId: 'bills',
      question: 'Do I need a new meter?',
      answer: [
        'Often yes, if your home does not yet have a bi-directional smart meter.',
        'We arrange the meter reconfiguration request with your retailer after installation, and note any retailer-side steps clearly in your written quote.',
      ],
    },
    {
      id: 'finance',
      categoryId: 'paperwork',
      question: 'Can I pay it off over time?',
      answer: [
        'We can point you to green-loan providers that specialise in home solar and batteries.',
        'We do not arrange finance ourselves, and nothing is approved until the lender confirms directly with you. Your written quote gives the full net price after any applied discounts so you can compare options.',
      ],
    },
    {
      id: 'renters-strata',
      categoryId: 'paperwork',
      question: 'I rent or live in a strata block. Can I still go solar?',
      answer: [
        'You will need the property owner’s or body corporate’s written consent before any work starts.',
        'We can put together a plain-English summary of the roof layout, hardware and any applied discounts in a written quote for you to share with them.',
      ],
    },
    {
      id: 'what-to-check',
      categoryId: 'paperwork',
      question: 'How do I check the current rules?',
      answer: [
        'Check the Clean Energy Regulator website for federal scheme rules and your electricity retailer for current tariffs.',
        'We re-check every written quote against the rules in force on the day so the exact discount applied is clear before you commit.',
      ],
    },
  ],
};

/** Two teaser questions featured on the Home page. */
export const HOME_TEASER_FAQ_IDS = ['what-are-stcs', 'battery-discount'] as const;

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function formatReviewDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function validateRebates(data: RebatesContent = rebates): void {
  if (!ISO_DATE.test(data.lastReviewed)) {
    throw new Error(`rebates.lastReviewed (${data.lastReviewed}): must be YYYY-MM-DD`);
  }
  const parsed = new Date(`${data.lastReviewed}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== data.lastReviewed) {
    throw new Error(`rebates.lastReviewed (${data.lastReviewed}): invalid calendar date`);
  }

  const categoryIds = new Set<string>();
  for (const cat of data.categories) {
    if (!cat.id || !SLUG.test(cat.id)) {
      throw new Error(`rebates.categories[${cat.id || '(missing)'}]: id must be URL-safe`);
    }
    if (categoryIds.has(cat.id)) {
      throw new Error(`rebates.categories[${cat.id}]: duplicate category id`);
    }
    if (!cat.title.trim()) {
      throw new Error(`rebates.categories[${cat.id}]: title is required`);
    }
    categoryIds.add(cat.id);
  }

  const faqIds = new Set<string>();
  for (const faq of data.faqs) {
    if (!faq.id || !SLUG.test(faq.id)) {
      throw new Error(`rebates.faqs[${faq.id || '(missing)'}]: id must be URL-safe`);
    }
    if (faqIds.has(faq.id)) {
      throw new Error(`rebates.faqs[${faq.id}]: duplicate faq id`);
    }
    faqIds.add(faq.id);
    if (!categoryIds.has(faq.categoryId)) {
      throw new Error(`rebates.faqs[${faq.id}]: unknown categoryId "${faq.categoryId}"`);
    }
    if (!faq.question.trim()) {
      throw new Error(`rebates.faqs[${faq.id}]: question is required`);
    }
    if (!faq.answer.length || faq.answer.some(paragraph => !paragraph.trim())) {
      throw new Error(`rebates.faqs[${faq.id}]: answer cannot be empty`);
    }
  }
}
