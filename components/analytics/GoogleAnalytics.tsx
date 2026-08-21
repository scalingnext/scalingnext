import Script from 'next/script';
import { Suspense } from 'react';
import { GA_MEASUREMENT_ID } from './ga-config';
import { GoogleAnalyticsPageview } from './GoogleAnalyticsPageview';

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
          `,
        }}
      />
      {/* send_page_view is false above so GoogleAnalyticsPageview owns every
          pageview, including the first. Leaving it on would double-count the
          landing page. useSearchParams needs a Suspense boundary or it opts the
          whole route out of static rendering. */}
      <Suspense fallback={null}>
        <GoogleAnalyticsPageview />
      </Suspense>
    </>
  );
}
