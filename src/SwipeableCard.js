import React, { useState } from 'react'
import { View, Text, Animated } from 'react-native'
import { MediaCard } from 'nottinderuikit'
// import { debug } from 'react-native-reanimated';

 var nextorprev=1;
const SwipeableCard = (props) => {
  // Sample Array of images from Unsplash
  const images = props.data;
  // console.log(images);
  // Here we manage the current image by it's index
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePress= (evt)=>{
    
    nextorprev=-nextorprev;
  }
  const nextImage = () => {
    // This circular loop on the images array
    if(currentIndex==0 && nextorprev ==-1){
      setCurrentIndex( images.length-1)
    }else{
    setCurrentIndex((currentIndex + nextorprev) % images.length);
  }
  };
  // Here we create the initial Animated ValueXY
  const initialPosition = new Animated.ValueXY();
 
 
  // In this sample we use resetPosition to re use the same card for this examples
 
 
 
  return  <View
    style={{
      height: "98%",
      width: "100%",
    }}
    onTouchStart={(e) => {e.nativeEvent.pageX > 190 ? nextorprev=1 :  nextorprev=-1}}
  >
  
    <MediaCard
        positionXY={initialPosition}
       
        images={images}
        currentImageIndex={currentIndex}
        handleCurrentImageChange={nextImage}
      
        
      />

     
    
  </View>

}

 
export default SwipeableCard