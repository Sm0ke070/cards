export const formatDate = (date: string): string => {
  const fullDate = new Date(date)

  const convertFormat = (num: number) => {
    return num > 10 ? num : `0${num}`
  }

  return `${convertFormat(fullDate.getDate())}.${convertFormat(fullDate.getMonth() + 1)}.${convertFormat(
    fullDate.getFullYear()
  )}`
}
