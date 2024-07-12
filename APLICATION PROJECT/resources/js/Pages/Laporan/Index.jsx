import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { format } from 'date-fns';
import { DIVISI_PRIORITY_CLASS_MAP, DIVISI_PRIORITY_TEXT_MAP } from '@/constants';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from '@/Components/PdfDocument';

export default function Index({ auth, laporans, queryParams }) {
    const [startDate, setStartDate] = useState(queryParams.start_date ? new Date(queryParams.start_date) : null);
    const [endDate, setEndDate] = useState(queryParams.end_date ? new Date(queryParams.end_date) : null);

    const handleDateChange = () => {
        const start = startDate ? startDate.toISOString().split('T')[0] : '';
        const end = endDate ? endDate.toISOString().split('T')[0] : '';
        const url = new URL(window.location.href);
        url.searchParams.set('start_date', start);
        url.searchParams.set('end_date', end);
        window.location.href = url.toString();
    };

    const customInputStyle = {
        color: 'blue', // Change this color as needed
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Laporan</h2>}
        >
            <Head title="Laporan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex space-x-4 mb-4">
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-200">Start Date</label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="yyyy-MM-dd"
                                        className="mt-1 block w-full"
                                        customInput={<input style={customInputStyle} />}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-200">End Date</label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        dateFormat="yyyy-MM-dd"
                                        className="mt-1 block w-full"
                                        customInput={<input style={customInputStyle} />}
                                    />
                                </div>
                                <div className="flex items-end">
                                    <button
                                        onClick={handleDateChange}
                                        className="ml-3 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                                    >
                                        Filter
                                    </button>
                                </div>
                            </div>

                            <Link>
                                <PDFDownloadLink
                                    document={<PdfDocument laporans={laporans.data} />}
                                    fileName="laporan_inventory.pdf"
                                >
                                    {({ loading }) =>
                                        loading ? 'Generating PDF...' : 'Download PDF'
                                    }
                                </PDFDownloadLink>
                            </Link>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr>
                                            <th className="px-3 py-3">ID</th>
                                            <th className="px-3 py-3">Kode Barang</th>
                                            <th className="px-3 py-3">Nama Barang</th>
                                            <th className="px-3 py-3">Divisi</th>
                                            <th className="px-3 py-3">Quantity</th>
                                            <th className="px-3 py-3">User</th>
                                            <th className="px-3 py-3">Action</th>
                                            <th className="px-3 py-3">Tanggal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {laporans.data.map((laporan) => (
                                            <tr key={laporan.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-3 py-2">{laporan.id}</td>
                                                <td className="px-3 py-2">{laporan.inventory.kode_barang}</td>
                                                <td className="px-3 py-2">{laporan.inventory.name}</td>
                                                <td className="px-3 py-2">
                                                    <span
                                                        className={
                                                        "px-2 py-1 rounded text-nowrap text-white " +
                                                        DIVISI_PRIORITY_CLASS_MAP[laporan.inventory.divisiinv.divisi]
                                                        }
                                                    >
                                                        {DIVISI_PRIORITY_TEXT_MAP[laporan.inventory.divisiinv.divisi]}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2">{laporan.quantity}</td>
                                                <td className="px-3 py-2">{laporan.user.name}</td>
                                                <td className="px-3 py-2">{laporan.action}</td>
                                                <td className="px-3 py-2">{format(new Date(laporan.created_at), 'dd-MMMM-yyyy')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={laporans.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
