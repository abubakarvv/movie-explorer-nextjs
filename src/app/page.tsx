import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,_#f8fafc,_#eef2ff)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600">
            Rendering comparison
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">
            Movie Explorer: CSR vs SSR in Next.js
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            This project demonstrates how the same movie catalog can be built with
            Client-Side Rendering and Server-Side Rendering so you can compare
            both approaches in a real app.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/csr"
              className="rounded-full bg-slate-900 px-6 py-3 text-center font-medium text-white transition hover:bg-slate-700"
            >
              Explore CSR version
            </Link>
            <Link
              href="/ssr"
              className="rounded-full border border-slate-300 px-6 py-3 text-center font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Explore SSR version
            </Link>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">CSR version</h2>
            <p className="mt-3 text-slate-600">
              Uses useEffect and useState to fetch movies after the page loads. This is
              ideal for interactive dashboards and client-only experiences.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">SSR version</h2>
            <p className="mt-3 text-slate-600">
              Fetches content directly in a server component before the page reaches the browser,
              making it better for SEO and fast initial paint.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
