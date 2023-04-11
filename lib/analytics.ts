export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID
export const headScript = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-MJ1QHQK4G0');`

type EventProps = {
  action: string
  label: string
  category?: string
  value?: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  (window as any).gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: EventProps) => {
  (window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}