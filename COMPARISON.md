# Client-Side Rendering vs Server-Side Rendering in Next.js

## What is Client-Side Rendering?
Client-Side Rendering (CSR) means that the browser downloads a minimal HTML shell first and then uses JavaScript to fetch data and render the page after it loads. In this project, the CSR version uses useEffect and useState to request movie data after the page is already displayed.

## What is Server-Side Rendering?
Server-Side Rendering (SSR) means that the page is rendered on the server before it is sent to the browser. The server fetches the necessary data first, creates the HTML, and sends a fully populated page to the client. In this project, the SSR version fetches movie data directly in the server component.

## Main differences between CSR and SSR
- CSR loads a basic shell first and fetches data in the browser.
- SSR builds the HTML on the server and sends the complete page to the browser.
- CSR is better for highly interactive user experiences after initial load.
- SSR is better for content-heavy pages that need fast first paint and better search engine visibility.

## When would you use CSR?
CSR is useful when the page depends on user interaction, real-time updates, or client-only features such as dashboards, editors, and interactive filters.

## When would you use SSR?
SSR is useful for public pages such as blogs, news sites, product pages, and catalog listings where initial load speed and SEO matter.

## Which approach is better for SEO?
SSR is better for SEO because search engines can read the content from the HTML immediately, while CSR often requires JavaScript execution before the content appears to crawlers.

## Summary
Both approaches are valuable. CSR shines in highly interactive applications, while SSR is stronger for content-first applications that need strong performance and discoverability.
