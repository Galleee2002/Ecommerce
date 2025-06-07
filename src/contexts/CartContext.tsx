import React, { createContext, useContext, useReducer, ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | {
      type: "ADD_ITEM";
      payload: { product: Product; color: string; size: string };
    }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

const COLOR_MAP: Record<string, string> = {
  "#ffffff": "white",
  "#000000": "black",
  "#6b7280": "gray",
  "#8b5cf6": "purple",
  "#059669": "green",
  "#1e3a8a": "blue",
  "#ec4899": "pink",
  "#dc2626": "red",
  "#ea580c": "orange",
};

const IMAGE_MAP: Record<string, string> = {
  "1-white": "1596755094514-f87e34085b2c",
  "1-black": "1503341504253-dff4815485f1",
  "1-gray": "1571945153237-4929e783af4a",
  "1-purple": "1586790170083-2f9ceadc732d",
  "1-green": "1618354691373-d851c5c3a990",
  "1-blue": "1521572163474-6864f9cf17ab",
  "1-pink": "1562157873-818bc0726f68",
  "1-red": "1583743814966-8936f37f4651",
  "1-orange": "1556821840-3a63f95609a7",
  "2-white": "1542272604-787c3835535d",
  "2-black": "1503341504253-dff4815485f1",
  "2-gray": "1571945153237-4929e783af4a",
  "2-purple": "1586790170083-2f9ceadc732d",
  "2-green": "1618354691373-d851c5c3a990",
  "2-blue": "1521572163474-6864f9cf17ab",
  "2-pink": "1562157873-818bc0726f68",
  "2-red": "1583743814966-8936f37f4651",
  "2-orange": "1556821840-3a63f95609a7",
  "3-white": "1586790170083-2f9ceadc732d",
  "3-black": "1503341504253-dff4815485f1",
  "3-gray": "1571945153237-4929e783af4a",
  "3-purple": "1586790170083-2f9ceadc732d",
  "3-green": "1618354691373-d851c5c3a990",
  "3-blue": "1521572163474-6864f9cf17ab",
  "3-pink": "1562157873-818bc0726f68",
  "3-red": "1583743814966-8936f37f4651",
  "3-orange": "1556821840-3a63f95609a7",
  "4-white": "1551028719-00167b16eac5",
  "4-black": "1503341504253-dff4815485f1",
  "4-gray": "1571945153237-4929e783af4a",
  "4-purple": "1586790170083-2f9ceadc732d",
  "4-green": "1618354691373-d851c5c3a990",
  "4-blue": "1521572163474-6864f9cf17ab",
  "4-pink": "1562157873-818bc0726f68",
  "4-red": "1583743814966-8936f37f4651",
  "4-orange": "1556821840-3a63f95609a7",
  "5-white": "1549298916-b41d501d3772",
  "5-black": "1503341504253-dff4815485f1",
  "5-gray": "1571945153237-4929e783af4a",
  "5-purple": "1586790170083-2f9ceadc732d",
  "5-green": "1618354691373-d851c5c3a990",
  "5-blue": "1521572163474-6864f9cf17ab",
  "5-pink": "1562157873-818bc0726f68",
  "5-red": "1583743814966-8936f37f4651",
  "5-orange": "1556821840-3a63f95609a7",
  "6-white": "1521572163474-6864f9cf17ab",
  "6-black": "1503341504253-dff4815485f1",
  "6-gray": "1571945153237-4929e783af4a",
  "6-purple": "1586790170083-2f9ceadc732d",
  "6-green": "1618354691373-d851c5c3a990",
  "6-blue": "1521572163474-6864f9cf17ab",
  "6-pink": "1562157873-818bc0726f68",
  "6-red": "1583743814966-8936f37f4651",
  "6-orange": "1556821840-3a63f95609a7",
  "7-white": "1591195853828-11db59a44f6b",
  "7-black": "1503341504253-dff4815485f1",
  "7-gray": "1571945153237-4929e783af4a",
  "7-purple": "1586790170083-2f9ceadc732d",
  "7-green": "1618354691373-d851c5c3a990",
  "7-blue": "1521572163474-6864f9cf17ab",
  "7-pink": "1562157873-818bc0726f68",
  "7-red": "1583743814966-8936f37f4651",
  "7-orange": "1556821840-3a63f95609a7",
  "8-white": "1556821840-3a63f95609a7",
  "8-black": "1503341504253-dff4815485f1",
  "8-gray": "1571945153237-4929e783af4a",
  "8-purple": "1586790170083-2f9ceadc732d",
  "8-green": "1618354691373-d851c5c3a990",
  "8-blue": "1521572163474-6864f9cf17ab",
  "8-pink": "1562157873-818bc0726f68",
  "8-red": "1583743814966-8936f37f4651",
  "8-orange": "1556821840-3a63f95609a7",
  "9-white": "1596755094514-f87e34085b2c",
  "9-black": "1503341504253-dff4815485f1",
  "9-gray": "1571945153237-4929e783af4a",
  "9-purple": "1586790170083-2f9ceadc732d",
  "9-green": "1618354691373-d851c5c3a990",
  "9-blue": "1521572163474-6864f9cf17ab",
  "9-pink": "1562157873-818bc0726f68",
  "9-red": "1583743814966-8936f37f4651",
  "9-orange": "1556821840-3a63f95609a7",
};

export const getProductImage = (
  productId: number,
  colorHex: string
): string => {
  const colorName = COLOR_MAP[colorHex] || "white";
  const imageId =
    IMAGE_MAP[`${productId}-${colorName}`] ||
    IMAGE_MAP[`${productId}-white`] ||
    "1596755094514-f87e34085b2c";
  return `https://images.unsplash.com/photo-${imageId}?w=400&h=500&fit=crop`;
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, color, size } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === existingItem.id &&
          item.selectedColor === color &&
          item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: state.total + product.price,
          itemCount: state.itemCount + 1,
        };
      }

      const newItem: CartItem = {
        ...product,
        quantity: 1,
        selectedColor: color,
        selectedSize: size,
      };

      return {
        ...state,
        items: [...state.items, newItem],
        total: state.total + product.price,
        itemCount: state.itemCount + 1,
      };
    }

    case "REMOVE_ITEM": {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );
      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.total - itemToRemove.price * itemToRemove.quantity,
        itemCount: state.itemCount - itemToRemove.quantity,
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: id });
      }

      const item = state.items.find((item) => item.id === id);
      if (!item) return state;

      const quantityDiff = quantity - item.quantity;
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      return {
        ...state,
        items: updatedItems,
        total: state.total + item.price * quantityDiff,
        itemCount: state.itemCount + quantityDiff,
      };
    }

    case "CLEAR_CART":
      return {
        items: [],
        total: 0,
        itemCount: 0,
      };

    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (product: Product, color: string, size: string) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });

  const addItem = (product: Product, color: string, size: string) => {
    dispatch({ type: "ADD_ITEM", payload: { product, color, size } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
