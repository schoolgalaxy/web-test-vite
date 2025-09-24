interface Metric {
  name: string;
  delta: number;
  id: string;
  value: number;
  rating?: string;
  entries?: PerformanceEntry[];
}

export const sendToAnalytics = (metric: Metric) => {
  const { delta, id, value, rating, entries } = metric;
  if (window.gtag) {
    window.gtag('event', metric.name, {
      eventCategory: 'Web Vitals',
      value: delta,
      metric_id: id, // id unique to current page load
      metric_value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
      metric_rating: rating,
      metric_entries: entries,
      nonInteraction: true, // avoids affecting bounce rate
    });
  }
};