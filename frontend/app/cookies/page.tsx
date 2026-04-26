import Link from 'next/link'

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white py-12 md:py-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors mb-8 md:mb-12">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Cookie Policy</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-8">
          Last updated: October 24, 2023
        </p>

        <div className="space-y-8 text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black dark:text-white">What Are Cookies?</h2>
            <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black dark:text-white">How We Use Cookies</h2>
            <p>At Boomarki, we use cookies primarily for authentication (keeping you logged in securely) and saving your preferences (like your dark/light mode toggle). We keep our cookie usage minimal and functional.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Essential Cookies:</strong> Required to keep your session active and secure.</li>
              <li><strong>Preference Cookies:</strong> Used to remember your UI choices.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black dark:text-white">Managing Cookies</h2>
            <p>Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may impact your overall user experience, as it will no longer be personalized to you.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
