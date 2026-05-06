import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white py-12 md:py-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors mb-8 md:mb-12">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-8">
          Last updated: May 6, 2026
        </p>

        <div className="space-y-8 text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black dark:text-white">1. Information We Collect</h2>
            <p>We collect information you provide directly to us when you create an account, save a bookmark, or communicate with us. This may include your email address, profile information, and the URLs you choose to save.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black dark:text-white">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve the Boomarki service. This includes syncing your bookmarks across devices, personalizing your experience, and sending you technical notices or support messages.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black dark:text-white">3. Data Storage and Security</h2>
            <p>Your saved links are stored securely. We use industry-standard encryption to protect your data in transit and at rest. We do not sell your personal data or your browsing habits to third parties.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black dark:text-white">4. Your Rights</h2>
            <p>You have the right to access, update, or delete your account information at any time from your settings page. If you wish to completely erase your data from our servers, you may request account deletion.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
