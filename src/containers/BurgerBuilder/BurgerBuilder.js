import React,{ Component } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


//all global variables are named in CAPITAL LETTERS
const INGREDIENT_PRICES ={
    salad: 0.5,
    cheese: 0.25,
    bacon: 0.75,
    meat: 1.3
}

class BurgerBuilder extends Component {
    state ={
        ingredients: {
            salad:  0,
            meat:   0,
            cheese: 0,
            bacon:  0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    updatedPurchase (ingredients){
        
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

            this.setState({purchasable: sum > 0})
    }

    addIngredientHandler =(type) => {
        const oldCountOfIngredients = this.state.ingredients[type];
        const newUpdatedCountOfIngredients = oldCountOfIngredients + 1;
        //here we cannot directly change the state using setState, since it will mutate the original state.
        //hence ... spread operator
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = newUpdatedCountOfIngredients;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        //now we call the setState{()}

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatedPurchase(updatedIngredients);

    }

    removeIngredientHandler = (type) =>{
        const oldCountOfIngredients = this.state.ingredients[type];
        if(oldCountOfIngredients <= 0){
            return;
        }
        const newUpdatedCountOfIngredients = oldCountOfIngredients - 1;
        //here we cannot directly change the state using setState, since it will mutate the original state.
        //hence ... spread operator
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = newUpdatedCountOfIngredients;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        //now we call the setState{()}

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatedPurchase(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    cancelPurchase = () =>{
        this.setState({purchasing: false})
    }

    continuePurchase = () =>{
        alert('You continue');
    }
    
    render (){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Aux>
                <Modal 
                    show ={this.state.purchasing}
                    modalClosed={this.cancelPurchase}>
                    <OrderSummary 
                        price={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        purchaseCancelled = {this.cancelPurchase}
                        purchaseContinued={this.continuePurchase}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientsAdded={this.addIngredientHandler}
                    ingredientsRemoved={this.removeIngredientHandler}
                    disabled = {disabledInfo} 
                    purchasable = {this.state.purchasable}
                    price={this.state.totalPrice} 
                    ordered ={this.purchaseHandler}                  
                />
            </Aux>
        )
    }
};

export default BurgerBuilder;