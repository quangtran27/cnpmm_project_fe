import { useMemo } from 'react'

const SIBLING_COUNT = 1
const DOTS = -1

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

export const usePagination = ({ currentPage, totalPages }: { currentPage: number; totalPages: number }) => {
  const paginationRange = useMemo(() => {
    // Tổng số nút hiển thị trong phân trang bao gồm:
    // trang hiện tại + số trang nằm kề trang hiện tại + trang đầu + trang cuối + 2 dấu 3 chấm
    const totalPageNumbers = SIBLING_COUNT * 2 + 5

    // Trường hợp 1: số trang ít hơn tổng số nút, không hiện dấu 3 chấm
    if (totalPages < totalPageNumbers) {
      return range(0, totalPages - 1)
    }

    // Tính toán nút bên trái và bên phải trang hiện tại
    const leftSiblingIndex = Math.max(currentPage - SIBLING_COUNT, 1)
    const rightSiblingIndex = Math.min(currentPage + SIBLING_COUNT, totalPages)

    // Không hiện dấu 3 chấm nếu chỉ có một nút ở giữa nút rìa và nút kề trang hiện tại
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2

    const firstPageIndex = 0
    const lastPageIndex = totalPages - 1

    // Trường hợp 2: Chỉ hiện dấu 3 chấm bên phải
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * SIBLING_COUNT
      const leftRange = range(0, leftItemCount - 1)
      return [...leftRange, DOTS, lastPageIndex]
    }

    // Trường hợp 3: Chỉ hiện dấu 3 chấm bên trái
    if (!shouldShowRightDots && shouldShowLeftDots) {
      const rightItemCount = 3 + 2 * SIBLING_COUNT
      const rightRange = range(totalPages - rightItemCount, totalPages - 1)
      return [firstPageIndex, DOTS, ...rightRange]
    }

    // Trường hợp 4: Hiện dấu 3 chấm cả bên trái và phải
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex - 1, rightSiblingIndex - 1)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }

    return []
  }, [totalPages, currentPage])

  return paginationRange
}
