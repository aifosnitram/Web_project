// lib/cart.js
import { Storage } from "./storage.js";

export const Cart = {
  cart: Storage.get("cart") || [],

  add(product) {
    this.cart.push(product);
    this.save();
  },

  removeAt(index) {
    this.cart.splice(index, 1);
    this.save();
  },

  removeAll() {
    this.cart = [];
    Storage.remove("cart");
  },

  save() {
    Storage.set("cart", this.cart);
  },

  get() {
    return this.cart;
  },

  total() {
    return this.cart.reduce((acc, p) => acc + (p.precio || 0), 0);
  },
};
