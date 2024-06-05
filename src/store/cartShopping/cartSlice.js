import { createSlice } from '@reduxjs/toolkit';

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return {
        cartItems: [],
        cartTotalQuantity: 0,
        cartTotalAmount: 0,
      };
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state from localStorage", e);
    return {
      cartItems: [],
      cartTotalQuantity: 0,
      cartTotalAmount: 0,
    };
  }
};

const initialState = loadStateFromLocalStorage();

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (e) {
    console.error("Could not save state to localStorage", e);
  }
};

const calculateCartTotalAmount = (cartItems) => {
  return cartItems.reduce((total, item) => {
    const price = item.discountPriceProduct ? Number(item.discountPriceProduct) : Number(item.priceProduct);
    return total + (price * item.quantity);
  }, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        item => item.idProduct === action.payload.idProduct
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        const tempProduct = { ...action.payload, quantity: 1 };
        state.cartItems.push(tempProduct);
      }

      state.cartTotalQuantity += 1;
      state.cartTotalAmount = calculateCartTotalAmount(state.cartItems);
      saveStateToLocalStorage(state);
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        item => item.idProduct === action.payload.idProduct
      );

      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity -= 1;
        } else {
          state.cartItems.splice(itemIndex, 1);
        }

        state.cartTotalQuantity -= 1;
        state.cartTotalAmount = calculateCartTotalAmount(state.cartItems);
        saveStateToLocalStorage(state);
      }
    },
    removeFromCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        item => item.idProduct === action.payload.id
      );

      if (itemIndex >= 0) {
        const removedItem = state.cartItems[itemIndex];
        state.cartTotalQuantity -= removedItem.quantity;
        state.cartItems.splice(itemIndex, 1);
        state.cartTotalAmount = calculateCartTotalAmount(state.cartItems);
        saveStateToLocalStorage(state);
      }
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      saveStateToLocalStorage(state);
    }
  },
});

export const { addToCart, decreaseCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
