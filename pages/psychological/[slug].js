import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { useEffect, useState } from 'react'
import { FaBrain, FaLightbulb } from 'react-icons/fa'
import Head from 'next/head'

export default function Resource() {
  const router = useRouter()
  const { slug } = router.query
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log("Component mounted, slug:", slug)
    try {
      setIsLoaded(true)
    } catch (err) {
      console.error("Error in useEffect:", err)
      setError(err.message)
    }
  }, [slug])

  if (error) {
    return <div className="text-white bg-red-500 p-4">Error: {error}</div>
  }

  if (!slug) {
    return <div className="text-white bg-gray-900 p-4">Loading...</div>
  }

  return (
    <Layout>
      <Head>
        <title>{slug ? `${slug} - HOPEFUND` : 'Resource - HOPEFUND'}</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 font-['Poppins'] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-5xl font-bold text-center mb-3 text-blue-300 typewriter glow flex items-center transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <FaBrain className="text-blue-500 mr-2" />
            {slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </h1>
          <p className="text-2xl text-center mb-16 text-gray-300">Explore valuable resources to support your mental health and emotional well-being</p>
          <div className={`bg-gray-800 shadow-2xl rounded-lg p-8 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-xl leading-relaxed text-gray-300 mb-8">
              This resource provides valuable information and
            </p>
          </div>
        </div>
      </main>
    </Layout>
  )
}