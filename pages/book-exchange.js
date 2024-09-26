import Head from 'next/head'
import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import { FaBook, FaExchangeAlt, FaGraduationCap, FaChalkboardTeacher, FaSearch } from 'react-icons/fa'
import Link from 'next/link'

export default function BookExchange() {
  const [activeBlock, setActiveBlock] = useState('exchange')
  const [formData, setFormData] = useState({ bookTitle: '', bookAuthor: '', bookCondition: 'new', bookType: 'fiction', description: '' })
  const [bookListings, setBookListings] = useState([])
  const [filterBookType, setFilterBookType] = useState('')
  const [educationalResources, setEducationalResources] = useState([])
  const [teacherResources, setTeacherResources] = useState([])
  const [psychEmotionalResources, setPsychEmotionalResources] = useState([])

  useEffect(() => {
    const storedListings = JSON.parse(localStorage.getItem('bookListings') || '[]')
    setBookListings(storedListings)

    setEducationalResources([
      { id: 1, title: 'Basic Literacy Course', level: 'Beginner', link: '/resources/literacy-basics' },
      { id: 2, title: 'Intermediate Reading Skills', level: 'Intermediate', link: '/resources/intermediate-reading' },
      { id: 3, title: 'Advanced Writing Techniques', level: 'Advanced', link: '/resources/advanced-writing' },
      { id: 4, title: 'Mathematics Fundamentals', level: 'Beginner', link: '/resources/math-fundamentals' },
      { id: 5, title: 'Science for Kids', level: 'Elementary', link: '/resources/kids-science' },
      { id: 6, title: 'History of the World', level: 'Intermediate', link: '/resources/world-history' },
      { id: 7, title: 'Coding for Beginners', level: 'Beginner', link: '/resources/coding-basics' },
      { id: 8, title: 'Advanced Physics Concepts', level: 'Advanced', link: '/resources/advanced-physics' },
    ])

    setTeacherResources([
      { id: 1, title: 'Effective Teaching Strategies', category: 'Pedagogy', link: '/teacher-resources/teaching-strategies' },
      { id: 2, title: 'Digital Tools for Education', category: 'Technology', link: '/teacher-resources/digital-tools' },
      { id: 3, title: 'Research Methodologies Workshop', category: 'Research', link: '/teacher-resources/research-methods' },
      { id: 4, title: 'Classroom Management Techniques', category: 'Management', link: '/teacher-resources/classroom-management' },
      { id: 5, title: 'Inclusive Education Practices', category: 'Diversity', link: '/teacher-resources/inclusive-education' },
      { id: 6, title: 'Assessment and Evaluation Methods', category: 'Assessment', link: '/teacher-resources/assessment-methods' },
      { id: 7, title: 'Curriculum Development Guide', category: 'Curriculum', link: '/teacher-resources/curriculum-development' },
      { id: 8, title: 'Educational Psychology Insights', category: 'Psychology', link: '/teacher-resources/educational-psychology' },
    ])

    setPsychEmotionalResources([
      { id: 1, title: 'Stress Management Techniques', category: 'Stress Relief', link: '/psych-resources/stress-management' },
      { id: 2, title: 'Emotional Intelligence Workshop', category: 'Self-Awareness', link: '/psych-resources/emotional-intelligence' },
      { id: 3, title: 'Mindfulness Meditation Guide', category: 'Mindfulness', link: '/psych-resources/mindfulness-meditation' },
      { id: 4, title: 'Coping with Anxiety', category: 'Anxiety Management', link: '/psych-resources/anxiety-coping' },
      { id: 5, title: 'Building Resilience', category: 'Mental Strength', link: '/psych-resources/resilience-building' },
      { id: 6, title: 'Positive Psychology Practices', category: 'Well-being', link: '/psych-resources/positive-psychology' },
      { id: 7, title: 'Conflict Resolution Skills', category: 'Interpersonal', link: '/psych-resources/conflict-resolution' },
      { id: 8, title: 'Self-Care Strategies', category: 'Personal Care', link: '/psych-resources/self-care' },
    ])
  }, [])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newListing = { ...formData, id: Date.now() }
    const updatedListings = [...bookListings, newListing]
    setBookListings(updatedListings)
    localStorage.setItem('bookListings', JSON.stringify(updatedListings))
    localStorage.setItem('recentBookSubmission', JSON.stringify(newListing))
    alert('Thank you for sharing a book!')
    setFormData({ bookTitle: '', bookAuthor: '', bookCondition: 'new', bookType: 'fiction', description: '' })
  }

  const filteredListings = bookListings.filter(listing => 
    filterBookType === '' || listing.bookType === filterBookType
  )

  return (
    <Layout>
      <Head>
        <title>Book Exchange & Learning Resources - HOPEFUND</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-blue-900 text-gray-100 font-['Roboto'] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-3 text-blue-300 typewriter glow">Book Exchange & Learning Resources</h1>
          <p className="text-2xl text-center mb-16 text-gray-300">Share knowledge, exchange books, and access valuable resources</p>

          <div className="mb-12 flex justify-center space-x-6">
            {['exchange', 'resources'].map((block) => (
              <button 
                key={block}
                onClick={() => setActiveBlock(block)} 
                className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 flex items-center ${
                  activeBlock === block 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {block === 'exchange' ? <FaExchangeAlt className="mr-2" /> : <FaGraduationCap className="mr-2" />}
                {block.charAt(0).toUpperCase() + block.slice(1)}
              </button>
            ))}
          </div>

          {activeBlock === 'exchange' && (
            <div className="bg-gray-800 shadow-xl rounded-lg p-8 mb-12">
              <h2 className="text-3xl font-semibold mb-8 text-center text-blue-300 flex items-center justify-center">
                <FaBook className="mr-2" /> Share a Book
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { name: 'bookTitle', label: 'Book Title', type: 'text' },
                  { name: 'bookAuthor', label: 'Author', type: 'text' },
                  { name: 'bookCondition', label: 'Condition', type: 'select', options: ['new', 'like-new', 'good', 'fair'] },
                  { name: 'bookType', label: 'Book Type', type: 'select', options: ['fiction', 'non-fiction', 'textbook', 'children', 'academic'] },
                  { name: 'description', label: 'Description', type: 'textarea' },
                ].map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-300">{field.label}:</label>
                    {field.type === 'select' ? (
                      <select
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                      >
                        {field.options.map(option => (
                          <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                        rows="3"
                        placeholder="Brief description or additional information about the book"
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
                  Share Book
                </button>
              </form>

              <h2 className="text-2xl font-semibold mt-12 mb-4 text-blue-300">Available Books</h2>
              <div className="mb-4">
                <label htmlFor="filterBookType" className="block text-sm font-medium text-gray-300">Filter by Book Type:</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <select
                    id="filterBookType"
                    value={filterBookType}
                    onChange={(e) => setFilterBookType(e.target.value)}
                    className="block w-full pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                  >
                    <option value="">All Types</option>
                    {['fiction', 'non-fiction', 'textbook', 'children', 'academic'].map(option => (
                      <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>
              {filteredListings.length > 0 ? (
                <ul className="space-y-4">
                  {filteredListings.map(listing => (
                    <li key={listing.id} className="border border-gray-700 rounded-lg p-4 hover:shadow-md transition duration-300">
                      <h3 className="font-semibold text-lg text-blue-300">{listing.bookTitle} by {listing.bookAuthor}</h3>
                      <p><strong>Condition:</strong> {listing.bookCondition}</p>
                      <p><strong>Type:</strong> {listing.bookType}</p>
                      {listing.description && <p><strong>Description:</strong> {listing.description}</p>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-400">No books available of this type.</p>
              )}
            </div>
          )}

          {activeBlock === 'resources' && (
            <div className="bg-gray-800 shadow-xl rounded-lg p-8 mb-12">
              <h2 className="text-3xl font-semibold mb-8 text-center text-blue-300 flex items-center justify-center">
                <FaChalkboardTeacher className="mr-2" /> Learning Resources
              </h2>
             
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-4 text-blue-300">For Teachers</h3>
                <p className="mb-4 text-gray-300">Access resources to enhance your teaching skills and share your knowledge:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teacherResources.map(resource => (
                    <li key={resource.id} className="bg-gray-700 rounded-lg p-4">
                      <Link href={resource.link} legacyBehavior>
                        <a className="text-blue-400 hover:underline font-semibold">{resource.title}</a>
                      </Link>
                      <span className="block text-sm text-gray-400 mt-1">{resource.category}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-4 text-blue-300">For Students</h3>
                <p className="mb-4 text-gray-300">Discover learning materials to support your studies:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {educationalResources.map(resource => (
                    <li key={resource.id} className="bg-gray-700 rounded-lg p-4">
                      <Link href={resource.link} legacyBehavior>
                        <a className="text-blue-400 hover:underline font-semibold">{resource.title}</a>
                      </Link>
                      <span className="block text-sm text-gray-400 mt-1">{resource.level}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-300">Psychological & Emotional Support</h3>
                <p className="mb-4 text-gray-300">Explore resources to support your mental health and emotional well-being:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {psychEmotionalResources.map(resource => (
                    <li key={resource.id} className="bg-gray-700 rounded-lg p-4">
                      <Link href={resource.link} legacyBehavior>
                        <a className="text-blue-400 hover:underline font-semibold">{resource.title}</a>
                      </Link>
                      <span className="block text-sm text-gray-400 mt-1">{resource.category}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  )
}