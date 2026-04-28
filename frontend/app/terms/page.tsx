import Link from 'next/link'

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white py-12 md:py-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors mb-8 md:mb-12">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-8">
          Last updated: October 24, 2023
        </p>

        <div className="space-y-8 text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black dark:text-white">1. Acceptance of Terms</h2>
            <p>By accessing or using Ghostmark, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black dark:text-white">2. Use License</h2>
            <p>You are granted a personal, non-exclusive, non-transferable license to use the Ghostmark app for your personal or internal business use. You may not use the service for any illegal or unauthorized purpose.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black dark:text-white">3. User Content</h2>
            <p>You retain all rights to the links, folders, and notes you save to Ghostmark. We claim no ownership over your content. However, by using the service, you grant us a license to store, process, and display your content strictly to provide the service to you.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black dark:text-white">4. Termination</h2>
            <p>We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
