import { Pagination } from './Pagination'

export class BaseEntity  {
  public success: boolean
  public message: string
  public pagination?: Pagination  
  public data: any

  constructor(
    success: boolean,
    message: string,
    pagination?: Pagination
  ) {
    this.success = success
    this.message = message
    this.pagination = pagination
  }
}
