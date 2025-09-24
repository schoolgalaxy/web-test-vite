/// <reference types="vite/client" />

interface Window {
  gtag: (
    command: string,
    eventName: string,
    params: {
      eventCategory: string;
      value: number;
      metric_id: string;
      metric_value: number;
      metric_rating?: string;
      metric_entries?: PerformanceEntry[];
      nonInteraction: boolean;
    }
  ) => void;
}
