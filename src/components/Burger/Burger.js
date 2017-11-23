import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngerdients'

const burger = (props) => {
    console.log(props.ingredients);

    //STEP1
    //convert the object with key-value to array.
    //'_' --> used since the argument is empty.
    //STEP2
    //flatten the array.

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredients key={igKey + i} type={igKey} />
            });
        }).reduce((arr,el) => {
            return arr.concat(el)
        }, []);

        if(transformedIngredients.length === 0){
            transformedIngredients =<p>Please start adding ingredients</p>
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type = "bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type = "bread-bottom"/>
            
            
        </div>
        
    )
};

export default burger;