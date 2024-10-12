import React, {useState } from 'react'
import './Card.css'
import like from '../../Assets/amour-vert.png'
import dislike from '../../Assets/croix-rouge.png'
import { useDispatch, useSelector } from 'react-redux';
import { nextRestaurant, previousRestaurant } from '../../Redux/Actions/SwipeActions';




function Card({}) {

    const [error, setError] = useState(null);
    const dispatch = useDispatch();
  const { restaurants, currentIndex } = useSelector(state => state.restaurants);
  const restaurant = restaurants[currentIndex];

  const handleButtonClick = (direction) => {
    if (direction === 'left') {
      dispatch(nextRestaurant());
    } else if (direction === 'right') {
      dispatch(previousRestaurant());
    }
  };
  return (
    <div className='CardContainer'>
         
        <div className='Card-content'>
       
        <img className='RestoImage'  src={restaurant.imageUrl}  onError={() => setError(true)}
        alt='No Image Found'
        />
   
    <div>
        <div className='InfoCard'>
            <div className='Infotext'>
                <h2 className='ville'>{restaurant.title}</h2>
                <h2 className='adress'>{restaurant.address}</h2>
            </div>
            <div className='Avis'>
                <span className='review'>{restaurant.totalScore}/5</span>
                <span>{restaurant.reviewsCount} Avis</span>
            </div>
        </div>
        <div className='func-btn-wrapper'>
        <button className='func-btn' onClick={() => handleButtonClick('left')} disabled={currentIndex === restaurants.length - 1} ><img src={like}/></button>
        <button className='func-btn' onClick={() => handleButtonClick('right')} disabled={currentIndex === 0}><img src={dislike}/></button>  
        </div>
     
    </div>


        </div>
           
    </div>
  )
}


  

export default Card