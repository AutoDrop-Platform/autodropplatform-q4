"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, useRef, useCallback } from "react"

export interface CartItem {
  id: string
  title: string
  price: number
  image: string
  quantity: number
  category: string
}

interface CartState {
  items: CartItem[]
  isLoaded: boolean
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }
  | { type: "SET_LOADED" }

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getCharityAmount: () => number
  isLoaded: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Helper functions for safe operations
const ensureNumber = (value: any, fallback = 0): number => {
  const num = Number(value)
  return isNaN(num) ? fallback : num
}

const sanitizeCartItem = (item: any): CartItem => ({
  id: String(item.id || ""),
  title: String(item.title || "Untitled Product"),
  price: ensureNumber(item.price, 0),
  image: String(item.image || "/placeholder.svg"),
  quantity: Math.max(1, ensureNumber(item.quantity, 1)),
  category: String(item.category || "Uncategorized"),
})

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const sanitizedPayload = sanitizeCartItem({ ...action.payload, quantity: 1 })
      const existingItemIndex = state.items.findIndex((item) => item.id === sanitizedPayload.id)

      if (existingItemIndex > -1) {
        const newItems = [...state.items]
        const existingItem = newItems[existingItemIndex]
        newItems[existingItemIndex] = { ...existingItem, quantity: existingItem.quantity + 1 }
        return { ...state, items: newItems }
      }

      return { ...state, items: [...state.items, sanitizedPayload] }
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload
      const safeQuantity = Math.max(0, ensureNumber(quantity, 0))

      if (safeQuantity === 0) {
        return { ...state, items: state.items.filter((item) => item.id !== id) }
      }

      return {
        ...state,
        items: state.items.map((item) => (item.id === id ? { ...item, quantity: safeQuantity } : item)),
      }
    }

    case "CLEAR_CART":
      return { ...state, items: [] }

    case "LOAD_CART":
      return { ...state, items: action.payload.map(sanitizeCartItem) }

    case "SET_LOADED":
      return { ...state, isLoaded: true }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isLoaded: false,
  })

  const isInitialized = useRef(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined" || isInitialized.current) return

    try {
      const savedCart = localStorage.getItem("autodrop-cart")
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        if (Array.isArray(parsedCart)) {
          dispatch({ type: "LOAD_CART", payload: parsedCart })
        }
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
      localStorage.removeItem("autodrop-cart") // Clear corrupted data
    } finally {
      dispatch({ type: "SET_LOADED" })
      isInitialized.current = true
    }
  }, [])

  // Save cart to localStorage when items change
  useEffect(() => {
    if (state.isLoaded) {
      try {
        localStorage.setItem("autodrop-cart", JSON.stringify(state.items))
      } catch (error) {
        console.error("Error saving cart to localStorage:", error)
      }
    }
  }, [state.items, state.isLoaded])

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }, [])

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" })
  }, [])

  const getTotalItems = useCallback(() => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }, [state.items])

  const getTotalPrice = useCallback(() => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [state.items])

  const getCharityAmount = useCallback(() => {
    return getTotalPrice() * 0.25 // 25% for charity
  }, [getTotalPrice])

  const value: CartContextType = {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getCharityAmount,
    isLoaded: state.isLoaded,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
