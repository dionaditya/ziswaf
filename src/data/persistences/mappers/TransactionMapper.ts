import { singleton } from 'tsyringe';
// import { AxiosResponse } from 'axios';
// import { Transaction } from '@/domain/entities/Transactions';

// @singleton()
// export class TransactionMapper {
//     public convertTransactionListAuthFromApi(result: AxiosResponse<any>): Transaction {
//         const { data } = result
//         return data.data.map(
//             (val: any) =>
//                 new Transaction(
//                     val.id,
//                     val.donor_name,
//                     val.division_name,
//                     val.category_name,
//                     val.description,
//                     val.item_id,
//                     val.item_type,
//                     val.status,
//                     val.total,
//                     val.kwitansi,
//                     val.CreatedBy,
//                     val.UpdatedBy,
//                     val.created_at,
//                     val.updated_at
//                 )
//         )
//     }
// }