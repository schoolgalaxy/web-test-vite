interface Metric {
  name: string;
  delta: number;
  id: string;
  value: number;
  rating?: string;
  entries?: PerformanceEntry[];
}

// https://www.simoahava.com/analytics/track-core-web-vitals-in-ga4-with-google-tag-manager/

export const sendToAnalytics = (metric: Metric) => {
  const { delta, id, value, rating, entries } = metric;
  console.log("gtag events ", delta, id, value, rating, entries );
  // if (window.gtag) {
  //   window.gtag('event', metric.name, {
  //     eventCategory: 'Web Vitals',
  //     value: delta,
  //     metric_id: id, // id unique to current page load
  //     metric_value: value, // values must be integers
  //     metric_rating: rating,
  //     metric_entries: entries,
  //     nonInteraction: true, // avoids affecting bounce rate
  //   });
  // }
};