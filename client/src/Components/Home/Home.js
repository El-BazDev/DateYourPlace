import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Card from '../Card/Card'
import './Home.css'
import { motion, AnimatePresence} from 'framer-motion';
import { useSelector } from 'react-redux'
import { useDispatch} from 'react-redux';
import Loader from '../Loader/Loader';
import { nextRestaurant, previousRestaurant } from '../../Redux/Actions/SwipeActions';
import { selectCoordinates, selectGeolocationError } from '../../Redux/Selectors/GeolocationSelector';
import { fetchLocationInfo, setCoordinates } from '../../Redux/Slices/GeolocationSlice';
import Popup from '../Popup/Popup';







function Home({user}) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  //Geolocation
  const [showPopup, setShowPopup] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const { latitude, longitude } = useSelector(selectCoordinates);
  const error = useSelector(selectGeolocationError);


  
  const requestLocationAccess = () => {
    console.log('Requesting location access...');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location access granted. Coordinates:', position.coords.latitude, position.coords.longitude);
          dispatch(setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
          setShowPopup(false);
          setLocationError(null);
        },
        (error) => {
          console.error('Geolocation error:', error.message);
          setLocationError(error.message);
          setShowPopup(true);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
      setLocationError('Geolocation is not supported by your browser');
      setShowPopup(true);
    }
  };
  
  useEffect(() => {
    console.log('Component mounted. Requesting initial location access.');
    requestLocationAccess();
  }, []);
  
  useEffect(() => {
  
  
    if (latitude && longitude) {
      dispatch(fetchLocationInfo({ latitude, longitude }));
    }
  }, [latitude, longitude, dispatch]);

  
  
  
  
  const { restaurants, currentIndex } = useSelector(state => state.restaurants);
  const [direction, setDirection] = useState(null);

  const handleSwipe = (swipeDirection) => {
    if (swipeDirection === 'left' && currentIndex < restaurants.length - 1) {
      dispatch(nextRestaurant());
    } else if (swipeDirection === 'right' && currentIndex > 0) {
      dispatch(previousRestaurant());
    }
    setDirection(swipeDirection);
  };

  const motionProps = {
    initial: { opacity: 0, scale: 0.8, rotate: 0 },
    animate: { opacity: 1, scale: 1, rotate: direction === 'left' ? -2 : direction === 'right' ? 2 : 0 },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotate: direction === 'left' ? -30 : 30,
      transition: { duration: 0.2 },
    },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
    drag: 'x',
    dragConstraints: { left: 0, right: 0 },
    dragElastic: 0.2,
    onDragEnd: (_, info) => {
      if (info.offset.x < -100 && currentIndex < restaurants.length - 1) {
        handleSwipe('left');
      } else if (info.offset.x > 100 && currentIndex > 0) {
        handleSwipe('right');
      } else {
        setDirection(null);
      }
    },
  };

  if (error) return <div className='ErrorGeo'><h2>Something Went Wrong</h2><h2 className='error'>{error}</h2></div>;

  
  return (
    <div >
      {showPopup && <Popup  error={locationError} />}
      
        <Navbar user={user} />
<div className='card-wrapper'>

  {latitude && longitude !== null ? <AnimatePresence>
<motion.div
            key={currentIndex}
            {...motionProps}
            className="absolute w-full h-full"
            style={{ transformOrigin: 'center center' }}
          >
          
            <Card />
            {direction && (
              <div
                className={`absolute top-0 left-0 w-full h-full flex items-center justify-center text-6xl text-white ${
                  direction === 'left' ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
              </div>
            )}
          </motion.div>
        </AnimatePresence>:<Loader/>}

  </div>
    </div>
    
  )
}


export default Home