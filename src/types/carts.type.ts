export type CartItem = {
  productId: string
  quantity: number
}

export type Cart = {
  items: CartItem[]
}
