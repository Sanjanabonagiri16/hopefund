import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { useEffect, useState } from 'react'
import { FaBrain, FaGraduationCap, FaBook, FaLightbulb } from 'react-icons/fa'
import Head from 'next/head'

export default function Resource() {
  const router = useRouter()
  const { slug } = router.query
  const [isLoaded, setIsLoaded] = useState(false)
  const [resourceType, setResourceType] = useState('general')
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log("Component mounted, slug:", slug)
    try {
      setIsLoaded(true)
      if (slug) {
        if (slug.startsWith('psych-')) {
          setResourceType('psychological')
        } else if (slug.startsWith('teacher-')) {
          setResourceType('education')
        } else {
          setResourceType('general')
        }
      }
    } catch (err) {
      console.error("Error in useEffect:", err)
      setError(err.message)
    }
  }, [slug])

  const getIcon = () => {
    switch (resourceType) {
      case 'psychological':
        return <FaBrain className="text-blue-500 mr-2" />
      case 'education':
        return <FaGraduationCap className="text-green-500 mr-2" />
      default:
        return <FaBook className="text-yellow-500 mr-2" />
    }
  }

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
            {getIcon()}
            {slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </h1>
          <p className="text-2xl text-center mb-16 text-gray-300">Explore valuable resources to support your mental health and emotional well-being</p>
          <div className={`bg-gray-800 shadow-2xl rounded-lg p-8 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-xl leading-relaxed text-gray-300 mb-8">
              This resource provides valuable information and guidance on {slug.split('-').join(' ')}. Whether you're seeking personal growth, professional development, or educational support, you'll find practical insights and tools here.
            </p>
            <div className="space-y-8">
              <h2 className="text-3xl font-semibold text-blue-300 relative overflow-hidden pb-3">
                <span className="relative z-10">Key Points:</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-300 transform origin-left scale-x-0 transition-transform duration-500 ease-out" style={{transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)'}}></span>
              </h2>
              <ul className="list-none space-y-4 text-gray-300">
                {['Important aspect 1', 'Crucial information', 'Practical tips', 'Additional resources'].map((point, index) => (
                  <li key={index} className={`flex items-center transition-all duration-500 ease-in-out ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{transitionDelay: `${index * 200}ms`}}>
                    <FaLightbulb className="text-yellow-400 mr-3" />
                    <span>{point} about {slug.split('-').join(' ')}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-blue-300 mb-6 relative overflow-hidden pb-3">
                  <span className="relative z-10">Explore Further:</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-300 transform origin-left scale-x-0 transition-transform duration-500 ease-out" style={{transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)'}}></span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['Related Resource 1', 'Related Resource 2', 'Further Reading', 'Expert Insights'].map((item, index) => (
                    <div key={index} className={`bg-gray-700 rounded-lg p-6 transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{transitionDelay: `${(index + 4) * 200}ms`}}>
                      <a href="#" className="text-blue-400 hover:underline font-semibold text-lg">{item}</a>
                      <p className="text-sm text-gray-300 mt-2">Brief description of the related content and its benefits.</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}