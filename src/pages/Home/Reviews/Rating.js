import React from 'react';
import { AiFillStar } from 'react-icons/ai'
import './rating.css'

const Rating = ({rating}) => {

    rating = parseInt(rating);

    if(rating === 5){
        return(
            <div className='rating'>
                <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar />
            </div>
        ) 
    }else if(rating === 4){
        return(
            <div className='rating'>
                <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar />
            </div>
        ) 
    }else if(rating === 3){
        return(
            <div className='rating'>
                <AiFillStar /> <AiFillStar /> <AiFillStar /> 
            </div>
        ) 
    }else if(rating === 2){
        return(
            <div className='rating'>
                <AiFillStar /> <AiFillStar />
            </div>
        ) 
    }else{
        return(
            <div className='rating'>
                <AiFillStar />
            </div>
        ) 
    }

};

export default Rating;