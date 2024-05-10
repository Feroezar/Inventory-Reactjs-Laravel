import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export default function Index({auth, ivenits, queryParams = null}) {
    queryParams = queryParams || {};
    const searcFieldChanged = (nomor_pr,value) => {
        if(value){
            queryParams[nomor_pr] = value
        }else{
            delete queryParams[nomor_pr]
        }

        router.get(route('ivenit.index'), queryParams);
    };
    
    const onKeyPress = (nomor_pr, e) => {
        if(e.key !== 'Enter') return;
        searcFieldChanged(nomor_pr, e.target.value)
    };

    const sortChanged = (name) => {
        if(name === queryParams.sort_field){
            if(queryParams.sort_direction === 'asc'){
                queryParams.sort_direction = 'desc';
            }else {
                queryParams.sort_direction = 'asc';
            }
        }else {
                queryParams.sort_field = name;
                queryParams.sort_direction = 'asc';
            }
        router.get(route('ivenit.index'), queryParams);

        };

    return (
        <AuthenticatedLayout
        user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inventory</h2>}
        >
        <Head title="Inventori"/>

        <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-grey-100">
                            <div className="overflow-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-blue-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-red-500">
                                    <tr className="text-nowrap">
                                        <th onClick={e => sortChanged('id')} className="px-3 py-3 flex items-center justify-between gap-1">
                                        No
                                        <div>
                                            <ChevronUpIcon className='w-4'/>
                                            <ChevronDownIcon className="w-4 -mt-2"/>
                                        </div>
                                        </th>
                                        <th className="px-3 py-3">Image</th>
                                        <th className="px-3 py-3">Nomor PR</th>
                                        <th onClick={e => sortChanged('nm_barang')} className="px-3 py-3 flex items-center justify-between gap-1">
                                        Nama Barang
                                        <div>
                                            <ChevronUpIcon className='w-4'/>
                                            <ChevronDownIcon className="w-4 -mt-2"/>
                                        </div>
                                        </th>
                                        <th className="px-3 py-3">Description</th>
                                        <th onClick={e => sortChanged('stock')} className="px-3 py-3 flex items-center justify-between gap-1">
                                        Stock
                                        <div>
                                            <ChevronUpIcon className='w-4'/>
                                            <ChevronDownIcon className="w-4 -mt-2"/>
                                        </div>
                                        </th>
                                        <th className="px-3 py-3">Created By</th>
                                        <th onClick={e => sortChanged('created_at')} className="px-3 py-3 flex items-center justify-between gap-1">
                                        Update at
                                        <div>
                                            <ChevronUpIcon className='w-4'/>
                                            <ChevronDownIcon className="w-4 -mt-2"/>
                                        </div>
                                        </th>
                                        <th className="px-3 py-3">Action</th>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-red-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-blue-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            <TextInput 
                                                className="w-full" 
                                                defaultValue={queryParams.nomor_pr}
                                                placeholder="No PR"
                                                onBlur={e => searcFieldChanged('nomor_pr', e.target.value)}
                                                onKeyPress={e => onKeyPress('nomor_pr', e)}
                                            />
                                        </th>
                                        <th className="px-3 py-3">
                                            <TextInput 
                                                className="w-full"
                                                defaultValue={queryParams.nm_barang}
                                                placeholder="Nama Barang"
                                                onBlur={e => searcFieldChanged('nm_barang', e.target.value)}
                                                onKeyPress={e => onKeyPress('nm_barang', e)}
                                                />
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ivenits.data.map((project) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-2">{project.id}</td>
                                            <td className="px-3 py-2">
                                                <img src={project.image_path} style={{width: 100 }}/>
                                            </td>
                                            <td className="px-3 py-2">{project.nomor_pr}</td>
                                            <td className="px-3 py-2">{project.nm_barang}</td>
                                            <td className="px-3 py-2">{project.description}</td>
                                            <td className="px-3 py-2">{project.stock}</td>
                                            <td className="px-3 py-2">{project.created_by.name}</td>
                                            <td className="px-3 py-2 text-nowrap">{project.created_at}</td>
                                            <td className="px-3 py-2">
                                                <Link href={route('ivenit.edit', project.id)}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                                    Edit
                                                </Link>
                                                <Link href={route('ivenit.destroy', project.id)}
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}                     
                                </tbody>
                            </table>
                            </div>                            
                            <Pagination links={ivenits.meta.links}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}