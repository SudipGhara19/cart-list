import React from "react";
class CartItem extends React.Component{
    
    constructor(){
        super();
        this.state = {
            price: 999,
            title: 'Phone',
            Qty: 1,
            img: ''
        }
    }
    increaseQuantity = () => {
        // console.log('this', this.state);
        
        // setState from 1
        // this.setState({                     
        //     Qty: this.state.Qty + 1
        // });

        //setState from 2
        this.setState((prevState) => {
            return {
                Qty: prevState.Qty + 1
            }
        })
    }

    decreaseQuantity = () => {
        const {Qty} = this.state;
        if(Qty === 0){
            return;
        }
        this.setState({
            Qty: this.state.Qty - 1
        });
    }

    render(){
        const {price, title, Qty} = this.state;
        return (
            <div className="cart-item">
                <div className="left-block">
                    <img style={styles.image}/>
                </div>

                <div className="right-block">
                    <div style={{fontSize: 25}}> {title} </div>
                    <div style={{color: '#777'}}>Rs: {price} </div>
                    <div style={{color: '#777'}}>Qty: {Qty} </div>
                    <div className="cart-item-actions"></div>
                     {/* buttons ^ */}
                     <img alt="increase" 
                     className="action-icons" 
                     src="https://cdn-icons-png.flaticon.com/512/561/561169.png" 
                     onClick={this.increaseQuantity}
                     />
                     <img alt="decrease" 
                     className="action-icons" 
                     src="https://cdn-icons-png.flaticon.com/512/561/561179.png" 
                     onClick={this.decreaseQuantity}
                     />
                     <img alt="delete" 
                     className="action-icons" 
                     src="https://cdn-icons-png.flaticon.com/512/484/484611.png"
                     />
                </div>
            </div>
        );
    }
}

const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc'
    }
}

export default CartItem;