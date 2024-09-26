import Head from 'next/head'
import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import { FaHeart, FaBrain, FaHandsHelping, FaComments, FaUsers } from 'react-icons/fa'
import Link from 'next/link'

export default function EmotionalSupport() {
  const [activeBlock, setActiveBlock] = useState('support')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [supportResources, setSupportResources] = useState([])
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')

  useEffect(() => {
    setSupportResources([
      { id: 1, title: 'Stress Management Techniques', category: 'Stress Relief', link: '/resources/stress-management' },
      { id: 2, title: 'Emotional Intelligence Workshop', category: 'Self-Awareness', link: '/resources/emotional-intelligence' },
      { id: 3, title: 'Mindfulness Meditation Guide', category: 'Mindfulness', link: '/resources/mindfulness-meditation' },
      { id: 4, title: 'Coping with Anxiety', category: 'Anxiety Management', link: '/resources/anxiety-coping' },
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

  const handleChatSubmit = (e) => {
    e.preventDefault()
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { id: Date.now(), text: chatInput }])
      setChatInput('')
    }
  }

  return (
    <Layout>
      <Head>
        <title>Emotional Support - HOPEFUND</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-blue-900 text-gray-100 font-['Roboto'] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-3 text-blue-300 typewriter glow">Emotional Support</h1>
          <p className="text-2xl text-center mb-16 text-gray-300">Find resources and support for your emotional well-being</p>

          <div className="mb-12 flex justify-center space-x-6">
            {['support', 'resources', 'chat', 'groups'].map((block) => (
              <button 
                key={block}
                onClick={() => setActiveBlock(block)} 
                className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 flex items-center ${
                  activeBlock === block 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {block === 'support' && <FaHeart className="mr-2" />}
                {block === 'resources' && <FaBrain className="mr-2" />}
                {block === 'chat' && <FaComments className="mr-2" />}
                {block === 'groups' && <FaUsers className="mr-2" />}
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
                <FaBrain className="mr-2" /> Emotional Support Resources
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

          {activeBlock === 'chat' && (
            <div className="bg-gray-800 shadow-xl rounded-lg p-8 mb-12">
              <h2 className="text-3xl font-semibold mb-8 text-center text-blue-300 flex items-center justify-center">
                <FaComments className="mr-2" /> Chat with Others
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg max-h-64 overflow-y-auto">
                  {chatMessages.length > 0 ? (
                    chatMessages.map(message => (
                      <div key={message.id} className="mb-2">
                        <p className="text-gray-300">{message.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No messages yet. Start the conversation!</p>
                  )}
                </div>
                <form onSubmit={handleChatSubmit} className="flex space-x-4">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                    placeholder="Type your message..."
                  />
                  <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Send
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeBlock === 'groups' && (
            <div className="bg-gray-800 shadow-xl rounded-lg p-8 mb-12">
              <h2 className="text-3xl font-semibold mb-8 text-center text-blue-300 flex items-center justify-center">
                <FaUsers className="mr-2" /> Support Groups
              </h2>
              <p className="text-gray-300 mb-4">
                Join a support group to connect with others who share similar experiences. Our support groups provide a safe space to share, learn, and grow together.
              </p>
              <ul className="space-y-4">
                <li className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-300">Anxiety Support Group</h3>
                  <p className="text-gray-400">A group for individuals dealing with anxiety to share experiences and coping strategies.</p>
                </li>
                <li className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-300">Stress Management Group</h3>
                  <p className="text-gray-400">A group focused on techniques and practices for managing stress effectively.</p>
                </li>
                <li className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-300">Mindfulness and Meditation Group</h3>
                  <p className="text-gray-400">A group dedicated to mindfulness practices and meditation for mental well-being.</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </main>
    </Layout>
  )
}