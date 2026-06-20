import React from 'react';

const RecipeDetails = (props) => {
    return (
        <div>
            <h1>Recipe Details</h1>
            <h1>{props.name}</h1>
        </div>
    );
};

export default RecipeDetails;