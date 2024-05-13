import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({auth, ivenit}){
    return(
        <AuthenticatedLayout
        user={auth.user}
            header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                {`Project "${ivenit.nm_barang}"`}
            </h2>}
        >
        <Head title={`Project "${ivenit.nm_barang}"`}/>
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-grey-100">
                      <div>
                        <img
                          src={ivenit.image_path}
                          alt=""
                          className="w-full h-64 object-cover"
                        />
                      </div>
                      <div className="grid gap-1 grid-cols-2 mt-2">
                        <div>
                          <div>
                            <label className="font-bold text-lg">Nomor PR</label>
                            <p className="mt-1">{ivenit.nomor_pr}</p>
                          </div>
                          <div className="mt-4">
                            <label className="font-bold text-lg">Nama Barang</label>
                            <p className="mt-1">{ivenit.nm_barang}</p>
                          </div>
                          <div className="mt-4">
                            <label className="font-bold text-lg">Stock</label>
                            <p className="mt-1">{ivenit.stock}</p>
                          </div>
                        </div>
                        <div>
                          <div>
                            <label className="font-bold text-lg">Update At</label>
                            <p className="mt-1">{ivenit.created_at}</p>
                          </div>
                          <div className="mt-4">
                            <label className="font-bold text-lg">Update By</label>
                            <p className="mt-1">{ivenit.created_by.name}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="font-bold text-lg">Description</label>
                        <p className="mt-1">{ivenit.description}</p>
                      </div>
                    </div>
                </div>
            </div>
        </div>    
        </AuthenticatedLayout>
    )
}