import React from 'react';
import { Rating } from 'react-native-ratings';
import { View } from "react-native";

const RatingItem = () => {
    const ratingCompleted = (rating) => {

    }
    return (
        <View>
            <Rating
                type="custom"
                onFinishRating={ratingCompleted}
                ratingColor={"#bad759"}
                startingValue={5}
            />
        </View>
    )
}

export default RatingItem;