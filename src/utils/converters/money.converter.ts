export function toVND(money: number): string {
  return money
    .toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    })
    .replace('VND', 'đ')
}
