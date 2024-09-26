import Head from 'next/head'
import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import { FaBrain, FaHandsHelping, FaSearch } from 'react-icons/fa'
import Link from 'next/link'

export default function PsychologicalSupport() {
  const [activeBlock, setActiveBlock] = useState('support')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [supportResources, setSupportResources] = useState([])

  useEffect(() => {
    setSupportResources([
      { id: 1, title: 'Cognitive Behavioral Therapy', category: 'Therapy', link: '/resources/cbt' },
      { id: 2, title: 'Mindfulness Practices', category: 'Mindfulness', link: '/resources/mindfulness' },
      { id: 3, title: 'Stress Management Techniques', category: 'Stress Relief', link: '/resources/stress-management' },
      { id: 4, title: 'Coping with Depression', category: 'Depression', link: '/resources/depression-coping' },
      { id: 5, title: 'Building Resilience', category: 'Mental Strength', link: '/resources/resilience-building' },
      { id: 6, title: 'Positive Psychology Practices', category: 'Well-being', link: '/resources/positive-psychology' },
      { id: 7, title: 'Conflict Resolution Skills', category: 'Interpersonal', link: '/resources/conflict-resolution' },
      { id: 8, title: 'Self-Care Strategies', category: 'Personal Care', link: '/resources/self-care' },
    ])
  }, [])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for reaching out! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <Layout>
      <Head>
        <title>Psychological Support - HOPEFUND</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-blue-900 text-gray-100 font-['Roboto'] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-3 text-blue-300 typewriter glow">Psychological Support</h1>
          <p className="text-2xl text-center mb-16 text-gray-300">Find resources and support for your psychological well-being</p>

          <div className="mb-12 flex justify-center space-x-6">
            {['support', 'resources'].map((block) => (
              <button 
                key={block}
                onClick={() => setActiveBlock(block)} 
                className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 flex items-center ${
                  activeBlock === block 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {block === 'support' ? <FaHandsHelping className="mr-2" /> : <FaBrain className="mr-2" />}
                {block.charAt(0).toUpperCase() + block.slice(1)}
              </button>
            ))}
          </div>

          {activeBlock === 'support' && (
            <div className="bg-gray-800 shadow-xl rounded-lg p-8 mb-12">
              <h2 className="text-3xl font-semibold mb-8 text-center text-blue-300 flex items-center justify-center">
                <FaHandsHelping className="mr-2" /> Reach Out for Support
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { name: 'name', label: 'Your Name', type: 'text' },
                  { name: 'email', label: 'Your Email', type: 'email' },
                  { name: 'message', label: 'Your Message', type: 'textarea' },
                ].map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-300">{field.label}:</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                        rows="3"
                        placeholder="How can we help you?"
                      ></textarea>
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                      />
                    )}
                  </div>
                ))}

                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Submit
                </button>
              </form>
            </div>
          )}

          {activeBlock === 'resources' && (
            <div className="bg-gray-800 shadow-xl rounded-lg p-8 mb-12">
              <h2 className="text-3xl font-semibold mb-8 text-center text-blue-300 flex items-center justify-center">
                <FaBrain className="mr-2" /> Psychological Support Resources
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportResources.map(resource => (
                  <li key={resource.id} className="bg-gray-700 rounded-lg p-4">
                    <Link href={resource.link} legacyBehavior>
                      <a className="text-blue-400 hover:underline font-semibold">{resource.title}</a>
                    </Link>
                    <span className="block text-sm text-gray-400 mt-1">{resource.category}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </Layout>
  )
}