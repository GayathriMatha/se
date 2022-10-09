export const reducer = (state, action) => {


  if (action.type === "REMOVE_ITEM") {
    return {
      ...state,
      item: state.item.filter((curElem) => {
        return curElem.item_id !== action.payload;
      }),
    };
  }

  if (action.type === "CHANGE_ADDRESS_VALUE") {
    return {
      ...state,
      address: action.payload
    };
  }





  if (action.type === "SUBMIT_CART") {
  
    function validateCityOrPostalCode(value) {
      return /[0-9]{4}/.test(value);
    }
    
 


    if (state.address === '' || state.address === null || state.address.length < 10 || state.address.split(" ").length<2 || !validateCityOrPostalCode(state.address) || state.address.indexOf(" ")===-1) {
      alert("Please provide a valid address")
    } else {
      var post_data_object = {
        "order_address": state.address,
        "items": state.item
      }


      fetch('http://localhost:3000/api/postOrder', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(post_data_object),
        }).then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
          console.log('Success:', data);
          var order_status = data.order_status
          console.log(order_status)
          alert(order_status)
        })



    }

  }








  if (action.type === "SET_API_ITEMS") {
    return {
      ...state,
      item: action.payload
    };
  }






  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      item: []
    };
  }

  if (action.type === "INCREMENT") {
    const updatedCart = state.item.map((curElem) => {
      if (curElem.item_id === action.payload) {
        return {
          ...curElem,
          quantity: curElem.quantity + 1
        };
      }
      return curElem;
    });

    return {
      ...state,
      item: updatedCart
    };
  }

  if (action.type === "DECREMENT") {
    const updatedCart = state.item
      .map((curElem) => {
        if (curElem.item_id === action.payload) {
          if (curElem.quantity === 1) {
            return {
              ...curElem,
              quantity: curElem.quantity
            };
          }
          return {
            ...curElem,
            quantity: curElem.quantity - 1
          };
        }
        return curElem;
      })
      .filter((curElem) => curElem.quantity !== 0);
    return {
      ...state,
      item: updatedCart
    };
  }

  if (action.type === "GET_TOTAL") {
    let {
      totalItem,
      totalAmount
    } = state.item.reduce(
      (accum, curVal) => {
        let {
          price,
          quantity
        } = curVal;

        let updatedTotalAmount = price * quantity;
        accum.totalAmount += updatedTotalAmount;
        var state_tax = (2 / 100) * accum.totalAmount
        accum.totalAmount += state_tax;
        accum.totalAmount = (Math.round(accum.totalAmount * 100) / 100)
        // console.log(state_tax);

        accum.totalItem += quantity;
        return accum;
      }, {
        totalItem: 0,
        totalAmount: 0,
      }
    );
    return {
      ...state,
      totalItem,
      totalAmount
    };
  }
  return state;
};