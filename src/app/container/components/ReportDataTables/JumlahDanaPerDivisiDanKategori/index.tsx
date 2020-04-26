import React from 'react'
import formatPrice from '@/app/infrastructures/misc/Utils'

const collection = [1, 2]
const columns = [1, 2]

const DataTableReportJumlahPerDivisiDanKategori = ({ column, data }) => {
    return (
        <div className="row">
            <div className="col s6">
                <table className="display striped centered">
                    <thead className="white-text" style={{
                        background: '#3D5770'
                    }}>
                        <tr>
                            <th>Jenis Dana</th>
                            <th>Jumlah</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ritel Zakat Maal</td>
                            <td>{formatPrice(data.totalRitelZakatMaal)}</td>
                        </tr>
                        <tr>
                            <td>Ritel Wakaf</td>
                            <td>{formatPrice(data.totalRitelWakaf)}</td>
                        </tr>
                        <tr>
                            <td>Ritel Zakat Fitrah</td>
                            <td>{formatPrice(data.totalRitelZakatFitrah)}</td>
                        </tr>
                        <tr>
                            <td>Ritel Infaq</td>
                            <td>{formatPrice(data.totalRitelInfaq)}</td>
                        </tr>
                        <tr>
                            <td>Ritel Kurban</td>
                            <td>{formatPrice(data.totalRitelKurban)}</td>
                        </tr>
                        <tr>
                            <td>Ritel Lain</td>
                            <td>{formatPrice(data.totalRitelOther)}</td>
                        </tr>
                        <tr>
                            <td>Corp Zakat Maal</td>
                            <td>{formatPrice(data.totalCorporateZakatMaal)}</td>
                        </tr>
                        <tr>
                            <td>Corp Wakaf</td>
                            <td>{formatPrice(data.totalCorporateWakaf)}</td>
                        </tr>
                        <tr>
                            <td>Corporate Zakat Fitrah</td>
                            <td>{formatPrice(data.totalCorporateZakatFitrah)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="col s6">
                <table className="display striped centered">
                    <thead className="white-text" style={{
                        background: '#3D5770'
                    }}>
                        <tr>
                            <th>Jenis Dana</th>
                            <th>Jumlah</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Corp Infaq</td>
                            <td>{formatPrice(data.totalCorporateInfaq)}</td>
                        </tr>
                        <tr>
                            <td>Corp Kurban</td>
                            <td>{formatPrice(data.totalCorporateKurban)}</td>
                        </tr>
                        <tr>
                            <td>Corp Lain</td>
                            <td>{formatPrice(data.totalCorporateOther)}</td>
                        </tr>
                        <tr>
                            <td>Upz Zakat Maal</td>
                            <td>{formatPrice(data.totalUpzZakatMaal)}</td>
                        </tr>
                        <tr>
                            <td>Upz Wakaf</td>
                            <td>{formatPrice(data.totalUpzWakaf)}</td>
                        </tr>
                        <tr>
                            <td>Upz Zakat Fitrah</td>
                            <td>{formatPrice(data.totalUpzZakatFitrah)}</td>
                        </tr>
                        <tr>
                            <td>Upz Infaq</td>
                            <td>{formatPrice(data.totalUpzInfaq)}</td>
                        </tr>
                        <tr>
                            <td>Upz Kurban</td>
                            <td>{formatPrice(data.totalUpzKurban)}</td>
                        </tr>
                        <tr>
                            <td>Upz Lain</td>
                            <td>{formatPrice(data.totalUpzOther)}</td>
                        </tr>
                        <tr className="green darken-2 white-text">
                            <td>TOTAL</td>
                            <td>{formatPrice(data.totalRitelZakatMaal + data.totalRitelWakaf + data.totalRitelZakatFitrah + data.totalRitelInfaq + data.totalRitelKurban + data.totalRitelOther + data.totalCorporateZakatMaal + data.totalCorporateWakaf + data.totalCorporateZakatFitrah + data.totalCorporateInfaq + data.totalCorporateKurban + data.totalCorporateOther + data.totalUpzZakatMaal + data.totalUpzWakaf + data.totalUpzZakatFitrah + data.totalUpzInfaq + data.totalUpzKurban + data.totalUpzOther)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DataTableReportJumlahPerDivisiDanKategori