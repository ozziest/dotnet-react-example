export default interface IPagination<T> {
  page: number,
  pages: number,
  recordPerPage: number,
  total: number,
  data: T[]
}
