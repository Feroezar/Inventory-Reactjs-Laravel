import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function create({ auth }){
    const {data, setData, post, errors, reset} = useForm({
        image: '',
        no_pr: '',
        nm_barang: '',
        description: '',
        stock: '',
    })
    const onSubmit = (e) => {
        e.preventDefault();

        post(route("ivenit.create"));
    }

    return(
        <AuthenticatedLayout
        user={auth.user}
            header={
            <div className='flex justify-between items-center'>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create New Barang
                </h2>
            </div>
            }
        >
        <Head title="Inventori"/>

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <form onSubmit={onSubmit} 
                        method="POST" action="/projects" className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div className="mt-4">
                                <InputLabel htmFor='ivenit_image_path' value='Gambar Barang'
                                />
                                <TextInput 
                                id='ivenit_image_path' 
                                type='file'
                                name='image'
                                value={data.image}
                                className='mt-1 block w-full'
                                onChange={e => setData('image', e.target.value)}
                                />
                                <InputError message={errors.image_path} className="mt-2"/>  
                            </div>
                            <div className="mt-4">
                                <InputLabel htmFor='ivenit_nama_barang' value='Nama Barang'
                                />
                                <TextInput 
                                id='ivenit_nm_barang' 
                                type='text'
                                name='nm_barang'
                                value={data.nm_barang}
                                isFocused={true}
                                className='mt-1 block w-full'
                                onChange={e => setData('nm_barang', e.target.value)}
                                />
                                <InputError message={errors.image_path} className="mt-2"/>  
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    )
}