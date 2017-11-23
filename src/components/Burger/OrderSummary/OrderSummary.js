import React from 'react';
import Aux from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';


const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey =>{
            return <li key={igKey}>{igKey}: {props.ingredients[igKey]}</li>
        })
    return (
        <Aux>
            <h3>Your Order</h3>
            
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><b>Your price is: {props.price.toFixed(2)}</b></p> 
            <p>Continue to checkout?</p>
            <Button 
                btnType="Danger"
                clicked={props.purchaseCancelled}>                
                Cancel
            </Button>
            <Button 
                btnType="Success"
                clicked={props.purchaseContinued}>
                Continue
            </Button>
        </Aux>
        
    );
};

export default orderSummary;