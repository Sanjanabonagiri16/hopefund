import Head from 'next/head'
import Layout from '../components/Layout'
import Link from 'next/link'
import { FaBook, FaHeart, FaUtensils, FaBrain } from 'react-icons/fa'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Welcome to HOPEFUND</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-blue-900 text-gray-100 font-['Roboto'] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-3 text-blue-300 typewriter glow">Welcome to HOPEFUND</h1>

          <section className="mt-16">
            <h2 className="text-4xl font-semibold text-center mb-8 text-blue-300">Our Features</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800 shadow-xl rounded-lg p-8">
                <h3 className="text-3xl font-semibold mb-4 text-blue-300 flex items-center">
                  <FaBook className="mr-2" /> Book Exchange
                </h3>
                <p className="text-gray-300 mb-4">
                  Share knowledge, exchange books, and access valuable resources. Our book exchange program allows you to share your favorite books with others and discover new ones.
                </p>
                <Link href="/book-exchange" legacyBehavior>
                  <a className="text-blue-400 hover:underline font-semibold">Learn More</a>
                </Link>
              </div>

              <div className="bg-gray-800 shadow-xl rounded-lg p-8">
                <h3 className="text-3xl font-semibold mb-4 text-blue-300 flex items-center">
                  <FaHeart className="mr-2" /> Emotional Support
                </h3>
                <p className="text-gray-300 mb-4">
                  Find resources and support for your emotional well-being. Our emotional support program provides access to workshops, guides, and techniques to help you manage stress and improve your mental health.
                </p>
                <Link href="/emotional-support" legacyBehavior>
                  <a className="text-blue-400 hover:underline font-semibold">Learn More</a>
                </Link>
              </div>

              <div className="bg-gray-800 shadow-xl rounded-lg p-8">
                <h3 className="text-3xl font-semibold mb-4 text-blue-300 flex items-center">
                  <FaUtensils className="mr-2" /> Food Redistribution
                </h3>
                <p className="text-gray-300 mb-4">
                  Connect surplus food with those in need. Our food redistribution program helps reduce food waste and provides meals to those who need them the most.
                </p>
                <Link href="/food-redistribution" legacyBehavior>
                  <a className="text-blue-400 hover:underline font-semibold">Learn More</a>
                </Link>
              </div>

              <div className="bg-gray-800 shadow-xl rounded-lg p-8">
                <h3 className="text-3xl font-semibold mb-4 text-blue-300 flex items-center">
                  <FaBrain className="mr-2" /> Psychological Support
                </h3>
                <p className="text-gray-300 mb-4">
                  Access resources and support for your psychological well-being. Our psychological support program offers therapy, mindfulness practices, and techniques to help you cope with mental health challenges.
                </p>
                <Link href="/psychological-support" legacyBehavior>
                  <a className="text-blue-400 hover:underline font-semibold">Learn More</a>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  )
}
