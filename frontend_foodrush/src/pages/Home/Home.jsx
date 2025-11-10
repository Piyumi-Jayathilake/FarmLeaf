import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { bannerAssets, aboutfeature, cardData } from '../../assets/dummydata';
import Banner from '../../components/Banner/Banner';
import SpecialOffer from '../../components/SpecialOffer/SpecialOffer';
import AboutHome from '../../components/AboutHome/AboutHome';
import OurHomeMenu from '../../components/OurHomeMenu/OurHomeMenu';
import Footer from '../../components/Footer/Footer'
const Home = () => {
  return (
    <>
      <Navbar/>
      <Banner/>
      <SpecialOffer />
      <AboutHome />
      <OurHomeMenu />
      <Footer />
    </>
  )
}

export default Home
