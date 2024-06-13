import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, tasks, users, category, divisi }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    kode_barang: "",
    nm_barang: "",
    stock: "",
    status: "",
    kategori: "", // added kategori
    dv_barang: "", // added dv_barang
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("inventory.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create Barang Baru
          </h2>
        </div>
      }
    >
      <Head title="Tasks" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="task_image" value="Image" />
                <TextInput
                  id="task_image"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="task_kode_barang" value="Kode Barang" />

                <TextInput
                  id="task_kode_barang"
                  type="text"
                  name="kode_barang"
                  value={data.kode_barang}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("kode_barang", e.target.value)}
                />

                <InputError message={errors.kode_barang} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="task_nm_barang" value="Nama barang" />

                <TextInput
                  id="task_nm_barang"
                  type="text"
                  name="nm_barang"
                  value={data.nm_barang}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("nm_barang", e.target.value)}
                />

                <InputError message={errors.nm_barang} className="mt-2" />
              </div>
              
              <div className="mt-4">
                <InputLabel htmlFor="task_stock" value="Stock Barang" />

                <TextInput
                  id="task_stock"
                  type="number"
                  name="stock"
                  value={data.stock}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("stock", e.target.value)}
                />

                <InputError message={errors.stock} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="task_kategori" value="Kategori Barang" />

                <SelectInput
                  name="kategori" // changed name
                  id="task_kategori"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("kategori", e.target.value)}
                >
                  <option value="">Select kategori</option>
                  {category.data.map((kategoris) => (
                    <option value={kategoris.id} key={kategoris.id}>
                      {kategoris.nm_category}
                    </option>
                  ))}
                </SelectInput>

                <InputError message={errors.kategori} className="mt-2" />
              </div>   

              <div className="mt-4">
                <InputLabel htmlFor="task_dv_barang" value="Untuk Divisi" />

                <SelectInput
                  name="dv_barang" // changed name
                  id="task_dv_barang"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("dv_barang", e.target.value)}
                >
                  <option value="">Select Divisi</option>
                  {divisi.data.map((div) => (
                    <option value={div.id} key={div.id}>
                      {div.divisi}
                    </option>
                  ))}
                </SelectInput>

                <InputError message={errors.dv_barang} className="mt-2" />
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={route("inventory.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
