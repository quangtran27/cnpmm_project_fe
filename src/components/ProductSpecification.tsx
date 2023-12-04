import { ProductAttribute, ProductSpec } from '@/types/products.type'

type ProductSpecificationProps = {
  specifications: ProductSpec[]
  attributes: ProductAttribute[]
}

export default function ProductSpecification({ specifications, attributes }: ProductSpecificationProps) {
  const specs: { id: string; label: string; values: string[] }[] = specifications.map((spec) => {
    return {
      id: spec.id,
      label: attributes.find((attr) => attr.id === spec.productAttributeId)?.name ?? 'Thuộc tính',
      values: JSON.parse(spec.value) as string[],
    }
  })

  return (
    <div>
      <h3 className='text-lg font-semibold'>Thông tin sản phẩm</h3>
      <div className='mt-4 overflow-x-auto'>
        <table className='table table-zebra'>
          <tbody>
            {specs.map((spec) => (
              <tr key={spec.id}>
                <td>{spec.label}</td>
                <td>
                  <ul className='list-disc'>
                    {spec.values.map((value, index) => (
                      <li key={index}>{value}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
