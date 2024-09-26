import Head from 'next/head'
import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import { FaUtensils, FaMapMarkerAlt, FaCalendarAlt, FaWeightHanging, FaInfoCircle, FaTruck, FaHandsHelping, FaBicycle, FaCarSide, FaUsers } from 'react-icons/fa'

export default function FoodRedistribution() {
  const [formData, setFormData] = useState({ 
    donatorName: '', 
    location: '', 
    foodDescription: '', 
    expirationDate: '', 
    quantity: '', 
    dietaryInfo: '',
    pickupTime: ''
  })
  const [foodListings, setFoodListings] = useState([])
  const [filterLocation, setFilterLocation] = useState('')
  const [userType, setUserType] = useState('donator') // 'donator', 'transporter', or 'recipient'
  const [vehicleType, setVehicleType] = useState('bike') // 'bike', 'car', or 'truck'

  useEffect(() => {
    const storedListings = JSON.parse(localStorage.getItem('foodListings') || '[]')
    setFoodListings(storedListings)
  }, [])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newListing = { ...formData, id: Date.now(), status: 'Available' }
    const updatedListings = [...foodListings, newListing]
    setFoodListings(updatedListings)
    localStorage.setItem('foodListings', JSON.stringify(updatedListings))
    localStorage.setItem('recentFoodSubmission', JSON.stringify(newListing))
    alert('Thank you for sharing food!')
    setFormData({ 
      donatorName: '', 
      location: '', 
      foodDescription: '', 
      expirationDate: '', 
      quantity: '', 
      dietaryInfo: '',
      pickupTime: ''
    })
  }

  const handleTransportOffer = (listingId) => {
    const updatedListings = foodListings.map(listing =>
      listing.id === listingId ? { ...listing, status: 'Transport Offered', vehicleType } : listing
    )
    setFoodListings(updatedListings)
    localStorage.setItem('foodListings', JSON.stringify(updatedListings))
    alert(`Thank you for offering to transport this food using your ${vehicleType}!`)
  }

  const handleRecipientRequest = (listingId) => {
    const updatedListings = foodListings.map(listing =>
      listing.id === listingId ? { ...listing, status: 'Recipient Requested' } : listing
    )
    setFoodListings(updatedListings)
    localStorage.setItem('foodListings', JSON.stringify(updatedListings))
    alert('Your request for this food has been submitted!')
  }

  const filteredListings = foodListings.filter(listing => 
    listing.location.toLowerCase().includes(filterLocation.toLowerCase())
  )

  return (
    <Layout>
      <Head>
        <title>Food Redistribution - HOPEFUND</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-blue-900 text-gray-100 font-['Roboto']">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold text-center mb-3 text-blue-300 typewriter glow">Food Redistribution</h1>
          <p className="text-2xl text-center mb-16 text-gray-300">Connecting surplus food with those in need</p>

          <div className="mb-12 flex justify-center space-x-6">
            {['donator', 'transporter', 'recipient'].map((type) => (
              <button 
                key={type}
                onClick={() => setUserType(type)} 
                className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                  userType === type 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                I'm a {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {userType === 'donator' && (
            <div className="bg-gray-800 shadow-xl rounded-lg p-8 mb-12">
              <h2 className="text-3xl font-semibold mb-8 text-center text-blue-300 typewriter glow">Share Your Surplus Food</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { name: 'donatorName', label: 'Your Name', icon: FaHandsHelping, type: 'text', placeholder: 'Enter your name' },
                  { name: 'location', label: 'Your Location', icon: FaMapMarkerAlt, type: 'text', placeholder: 'Enter your city or area' },
                  { name: 'foodDescription', label: 'Food Description', icon: FaUtensils, type: 'textarea', placeholder: 'Describe the food you\'re sharing' },
                  { name: 'expirationDate', label: 'Expiration Date', icon: FaCalendarAlt, type: 'date' },
                  { name: 'quantity', label: 'Quantity', icon: FaWeightHanging, type: 'text', placeholder: 'e.g., 2 servings, 1 kg, etc.' },
                  { name: 'dietaryInfo', label: 'Dietary Information', icon: FaInfoCircle, type: 'text', placeholder: 'e.g., vegetarian, contains nuts, gluten-free, etc.' },
                  { name: 'pickupTime', label: 'Preferred Pickup Time', icon: FaCalendarAlt, type: 'datetime-local' },
                ].map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block mb-2 text-lg font-medium text-gray-300">
                      <field.icon className="inline mr-2 text-blue-400" />{field.label}:
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        rows="3"
                        placeholder={field.placeholder}
                      ></textarea>
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}

                <button type="submit" className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
                  Share Food
                </button>
              </form>
            </div>
          )}

          {userType === 'transporter' && (
            <div className="bg-gray-800 shadow-xl rounded-lg p-8 mb-12">
              <h2 className="text-3xl font-semibold mb-8 text-center text-blue-300 typewriter glow">Volunteer as a Transporter</h2>
              <p className="text-xl text-center mb-8 text-green-400 font-bold">All transport services are provided free of cost!</p>
              <div className="flex justify-center space-x-4 mb-8">
                {[
                  { type: 'bike', icon: FaBicycle, label: 'Bike' },
                  { type: 'car', icon: FaCarSide, label: 'Car' },
                  { type: 'truck', icon: FaTruck, label: 'Food Truck' },
                ].map((vehicle) => (
                  <button
                    key={vehicle.type}
                    onClick={() => setVehicleType(vehicle.type)}
                    className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 ${
                      vehicleType === vehicle.type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <vehicle.icon className="text-4xl mb-2" />
                    <span>{vehicle.label}</span>
                  </button>
                ))}
              </div>
              <p className="text-center text-gray-300 mb-8">Select your vehicle type and browse available food listings below to offer transportation.</p>
            </div>
          )}

          {userType === 'recipient' && (
            <div className="bg-gray-800 shadow-xl rounded-lg p-8 mb-12">
              <h2 className="text-3xl font-semibold mb-8 text-center text-blue-300 typewriter glow">Mediate Food Distribution</h2>
              <p className="text-xl text-center mb-8 text-gray-300">As a recipient, you play a crucial role in connecting donors with those in need.</p>
              <div className="flex justify-center items-center space-x-8 mb-8">
                <div className="text-center">
                  <FaHandsHelping className="text-5xl mb-2 text-blue-400 mx-auto" />
                  <p>Connect Donors</p>
                </div>
                <FaUsers className="text-4xl text-gray-500" />
                <div className="text-center">
                  <FaUtensils className="text-5xl mb-2 text-green-400 mx-auto" />
                  <p>Distribute Food</p>
                </div>
                <FaUsers className="text-4xl text-gray-500" />
                <div className="text-center">
                  <FaHandsHelping className="text-5xl mb-2 text-yellow-400 mx-auto" />
                  <p>Help the Needy</p>
                </div>
              </div>
              <p className="text-center text-gray-300 mb-8">Browse available food listings below to request and distribute to those in need.</p>
            </div>
          )}

          <div>
            <h2 className="text-3xl font-semibold mb-8 text-blue-300 typewriter glow">Available Food</h2>
            <div className="mb-6">
              <label htmlFor="filterLocation" className="block mb-2 text-lg font-medium text-gray-300">Filter by Location:</label>
              <input
                type="text"
                id="filterLocation"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter location to filter"
              />
            </div>
            {filteredListings.length > 0 ? (
              <ul className="space-y-6 overflow-y-auto max-h-96">
                {filteredListings.map(listing => (
                  <li key={listing.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:shadow-lg transition duration-300">
                    <h3 className="font-semibold mb-3 text-xl text-blue-300">{listing.foodDescription}</h3>
                    <p className="mb-2"><FaHandsHelping className="inline mr-2 text-blue-400" />Donator: {listing.donatorName}</p>
                    <p className="mb-2"><FaMapMarkerAlt className="inline mr-2 text-blue-400" />{listing.location}</p>
                    <p className="mb-2"><FaCalendarAlt className="inline mr-2 text-blue-400" />Expires: {listing.expirationDate}</p>
                    <p className="mb-2"><FaWeightHanging className="inline mr-2 text-blue-400" />{listing.quantity}</p>
                    {listing.dietaryInfo && <p className="mb-2"><FaInfoCircle className="inline mr-2 text-blue-400" />{listing.dietaryInfo}</p>}
                    <p className="mb-2"><FaCalendarAlt className="inline mr-2 text-blue-400" />Pickup: {listing.pickupTime}</p>
                    <p className="mb-4"><strong>Status:</strong> {listing.status}</p>
                    {userType === 'transporter' && listing.status === 'Available' && (
                      <button 
                        onClick={() => handleTransportOffer(listing.id)}
                        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                      >
                        Offer to Transport (Free)
                      </button>
                    )}
                    {userType === 'recipient' && listing.status === 'Available' && (
                      <button 
                        onClick={() => handleRecipientRequest(listing.id)}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                      >
                        Request for Distribution
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-400 mt-4 text-lg">No food listings available in this location.</p>
            )}
          </div>
        </div>
      </main>
    </Layout>
  )
}