"use client"

import Link from 'next/link'
import Container from '@/components/layout/Container'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white">
      <Container className='max-w-[1200px] mx-auto py-20'>
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link href="/" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
              ← Back to Home
            </Link>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              About Ghostmark
            </h1>
            <p className="text-xl text-neutral-500 dark:text-neutral-400">
              The intelligent bookmark organizer that helps you save, organize, and access your favorite links across all devices.
            </p>
          </div>

          {/* Mission */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              In a world of endless information, we believe your bookmarks should be your personal knowledge base, not a chaotic mess of links. 
              Ghostmark was built to transform how you collect, organize, and retrieve the content that matters to you most.
            </p>
          </section>

          {/* Features Grid */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">What Makes Ghostmark Different</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-lg font-semibold mb-3">Smart Organization</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Use AI-powered tagging and intelligent categorization to automatically organize your bookmarks.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-lg font-semibold mb-3">Cross-Device Sync</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Access your bookmarks seamlessly across desktop, mobile, and browser extensions.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-lg font-semibold mb-3">Privacy First</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Your data is yours. We use end-to-end encryption to keep your bookmarks private and secure.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-lg font-semibold mb-3">Powerful Search</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Find any bookmark instantly with our advanced search and filtering capabilities.
                </p>
              </div>
            </div>
          </section>

          {/* Story */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              Last updated: May 6, 2026
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Ghostmark started from a simple frustration: bookmark management was broken. We were drowning in browser bookmarks, 
              unable to find important links when we needed them most. After trying countless solutions, we decided to build our own.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mt-4">
              Today, Ghostmark helps thousands of users organize their digital lives. We're constantly improving and adding new features 
              based on your feedback.
            </p>
          </section>

          {/* CTA */}
          <section className="text-center py-12 bg-neutral-50 dark:bg-neutral-900 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Ready to Organize Your Bookmarks?</h2>
            <p className="text-neutral-600 dark:text-neutral-300 mb-6">
              Join thousands of users who have transformed their bookmark management.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Get Started Free
            </Link>
          </section>
        </div>
      </Container>
    </div>
  )
}
