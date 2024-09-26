import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const CustomSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: 'linear'
  }

  return (
    <div className="relative">
      <Slider {...settings}>
        <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
          Slide 1: Welcome to HOPEFUND
        </div>
        <div className="h-64 bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
          Slide 2: Share Knowledge
        </div>
        <div className="h-64 bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center text-white text-2xl font-bold">
          Slide 3: Exchange Books
        </div>
        <div className="h-64 bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold">
          Slide 4: Access Resources
        </div>
      </Slider>
    </div>
  )
}

export default CustomSlider