export type Category = {
  id: string
  name: string
  image: string
  description: string
  productAttributes: ProductAttribute[]
}

export type Brand = {
  id: string
  name: string
  image: string
}

export type Product = {
  id: string
  color: string
  description: string
  guarantee: string
  name: string
  onSale: boolean
  price: number
  quantity: number
  salePrice: number
  sold: number
  status: boolean
  brandId: string
  categoryId: string
  images: string[]
  productSpecs: ProductSpec[]
}

export type ProductAttribute = {
  id: string
  name: string
}

export type ProductSpec = {
  id: string
  productAttributeId: string
  value: string
}
