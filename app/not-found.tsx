import { InTheShadeArt, SunriseHorizonDivider } from '../components/artwork';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <>
      <section className="grain-band bg-sky py-16 sm:py-24">
        <div className="wrap text-center">
          <InTheShadeArt />
          <p className="mt-6 font-mono text-xs font-bold uppercase tracking-widest text-ink">
            Error 404
          </p>
          <h1 className="mt-2 text-4xl text-ink sm:text-6xl">This page is in the shade.</h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-ink/90 sm:text-lg">
            We couldn’t find that address. Step back into the sun with our packages, savings
            estimator or a quick quote request.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <SiteLink href="/" className="button">
              Back to Home
            </SiteLink>
            <SiteLink href="/packages/" className="button button-quiet">
              Compare packages
            </SiteLink>
            <SiteLink href="/contact/" className="button button-quiet">
              Request a free quote
            </SiteLink>
          </div>
        </div>
      </section>
      <SunriseHorizonDivider variant="rising" topColor="var(--sky)" bottomColor="var(--bg)" />
    </>
  );
}
