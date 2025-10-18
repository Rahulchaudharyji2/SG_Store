// import { createContext, useContext, useReducer } from "react";

// const CartContext = createContext();

// const initialState = {
//   cart: [],
// };

// function cartReducer(state, action) {
//   switch (action.type) {
//     case "ADD_TO_CART":
//       const existing = state.cart.find(item => item.id === action.payload.id);
//       if (existing) {
//         return {
//           ...state,
//           cart: state.cart.map(item =>
//             item.id === action.payload.id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           ),
//         };
//       }
//       return {
//         ...state,
//         cart: [...state.cart, { ...action.payload, quantity: 1 }],
//       };

//     case "INCREASE":
//       return {
//         ...state,
//         cart: state.cart.map(item =>
//           item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
//         ),
//       };

//     case "DECREASE":
//       return {
//         ...state,
//         cart: state.cart
//           .map(item =>
//             item.id === action.payload
//               ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
//               : item
//           ),
//       };

//     case "REMOVE_ITEM":
//       return {
//         ...state,
//         cart: state.cart.filter(item => item.id !== action.payload),
//       };

//     case "CLEAR_CART":
//       return { ...state, cart: [] };

//     default:
//       return state;
//   }
// }

// export const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   const subtotal = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <CartContext.Provider value={{ ...state, dispatch, subtotal }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case "INCREASE":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case "DECREASE":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        ),
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "SET_CART":
      return { ...state, cart: Array.isArray(action.payload) ? action.payload : [] };

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, (init) => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? { cart: JSON.parse(raw) } : init;
    } catch (e) {
      console.error("Failed to parse cart from localStorage", e);
      return init;
    }
  });

  // derive items and subtotal from state.cart
  const items = state.cart;
  const subtotal = items.reduce((acc, item) => acc + (Number(item.price || 0) * Number(item.quantity || 1)), 0);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    } catch (e) {
      console.error("Failed to persist cart", e);
    }
  }, [state.cart]);

  // Provide both cart and items for backward compatibility
  return (
    <CartContext.Provider value={{ cart: state.cart, items, dispatch, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};