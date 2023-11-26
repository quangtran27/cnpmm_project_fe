export interface Category {
  id: string
  name: string
  image: string
  description: string
}

export interface Brand {
  id: string
  name: string
  image: string
}

export interface Product {
  id: string
  name: string
  category: Category
  brand: Brand
  images: string[]
  status: boolean
  quantity: number
  sold: number
  price: number
  salePrice: number
  onSale: boolean
  color: string
  guarantee: string
  description: string
}

export interface ProductAttribute {
  id: string
  category: Category
  name: string
}

export interface ProductSpec {
  id: string
  product: Product
  attribute: ProductAttribute
  value: string
}
