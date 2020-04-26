import { singleton } from 'tsyringe';
import { AxiosResponse } from 'axios';
import { Donation, DonationDetail, DonationTransactionDetail, DonationWithSort } from '@/domain/entities/Donation';
import moment from 'moment';

@singleton()
export class DonationMapper {
    public convertDonationListFromApi(result: AxiosResponse<any>): Donation[] | null {
        const response = Array<Donation>();
        const aResp = result.data;
        if(result.data.data !== null) {
            aResp.data.forEach((item: any) => {
                var donation = new Donation(
                    item.id,
                    item.donor_name,
                    item.city,
                    item.division_name,
                    item.category_name,
                    item.description,
                    item.item_type,
                    item.ref_number,
                    item.item_category,
                    item.status,
                    item.total,
                    item.kwitansi,
                    item.unit,
                    item.phone,
                    item.cash_description,
                    item.good_description,
                    item.statement_category,
                    item.donor_category ? "Perusahaan" : "Perorangan",
                    item.quantity_good,
                    item.good_status,
                    item.created_by,
                    item.updated_by,
                    moment(item.created_at).format('dddd, DD MMMM YYYY'),
                    moment(item.updated_at).format('dddd, DD MMMM YYYY'),
                );
                response.push(donation);
            });
            return response;
        } else {
            return null
        }      
    }

    public convertDonatioDetailFromApi(result: AxiosResponse<any>): DonationTransactionDetail{
        const aResp = result.data.data;
        return new DonationTransactionDetail(
            aResp.id,
            aResp.description,
            aResp.donor_name,
            aResp.donor_phone,
            aResp.donor_email,
            aResp.donor_npwp,
            aResp.division_name,
            aResp.unit,
            aResp.city,
            aResp.kwitansi,
            aResp.category,
            aResp.statement_category,
            aResp.total,
            aResp.item_type,
            aResp.item_category,
            aResp.ref_number,
            aResp.quantity,
            aResp.status,
            aResp.created_at,
            aResp.cash_description,
            aResp.good_description,
            aResp.donor_category,
            aResp.good_status,
            aResp.created_by,
            aResp.donor_address

        );
    }

    public convertCreateDonationListFromApi(result: AxiosResponse<any>): DonationDetail {
        const { data } = result
        return new DonationDetail (
            data.data.id,
            data.data.transaction_id,
        )
    }

    public convertDonationListFromApiWithPagination(result: AxiosResponse<any>): any | null {
        const response = Array<DonationWithSort>();
        const aResp = result.data;
        if(result.data.data !== null) {
            aResp.data.forEach((item: any) => {
                var donation = new DonationWithSort(
                    item.id,
                    item.donor_name,
                    item.city,
                    item.division_name,
                    item.category_name,
                    item.description,
                    item.item_type,
                    item.ref_number,
                    item.item_category,
                    item.status,
                    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.total),
                    item.kwitansi,
                    item.unit,
                    item.phone,
                    item.cash_description,
                    item.good_description,
                    item.statement_category,
                    item.donor_category ? "Perusahaan" : "Perorangan",
                    item.quantity_good,
                    item.good_status,
                    item.created_by,
                    item.updated_by,
                    moment(item.created_at).format('dddd, DD MMMM YYYY'),
                    moment(item.updated_at).format('dddd, DD MMMM YYYY'),
                );
                response.push(donation);
            });
            return response;
        } else {
            return null
        }      
    }

}

