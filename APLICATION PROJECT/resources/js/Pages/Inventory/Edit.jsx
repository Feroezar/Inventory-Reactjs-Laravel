import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, inventory, category, divisi }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    kode_barang: inventory.kode_barang || "",
    name: inventory.name || "",
    stock: inventory.stock || "",
    category_id: inventory.category_id || "",
    divisi_inv: inventory.divisi_inv || "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("inventory.update", inventory.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit project "{inventory.name}"
          </h2>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              {inventory.image_path && (
                <div className="mb-4">
                  <img src={inventory.image_path} className="w-64" />
                </div>
              )}
              <div className="mt-4">
                <InputLabel htmlFor="inventory_image" value="Barang Image" />
                <TextInput
                  id="inventory_image"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="inventory_kode_barang"
                  value="Nomor PR"
                />

                <TextInput
                  id="inventory_kode_barang"
                  type="text"
                  name="kode_barang"
                  value={data.kode_barang}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("kode_barang", e.target.value)}
                />

                <InputError message={errors.kode_barang} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="inventory_name" value="Change Name" />

                <TextInput
                  id="inventory_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="inventory_stock"
                  value="Jumlah Barang"
                />

                <TextInput
                  id="inventory_stock"
                  type="number"
                  name="stock"
                  value={data.stock}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("stock", e.target.value)}
                />

                <InputError message={errors.stock} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="inventory_category_id"
                  value="Nama Kategori"
                />

                <SelectInput
                  name="category_id"
                  id="inventory_category_id"
                  className="mt-1 block w-full"
                  value={data.category_id}
                  onChange={(e) => setData("category_id", e.target.value)}
                >
                  <option value="">Select Category</option>
                  {category.data.map((inv) => (
                    <option value={inv.id} key={inv.id}>
                      {inv.nm_category}
                    </option>
                  ))}
                </SelectInput>

                <InputError
                  message={errors.category_id}
                  className="mt-2"
                />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="inventory_divisi_inv"
                  value="Barang Divisi"
                />

                <SelectInput
                  name="divisi_inv"
                  id="inventory_divisi_inv"
                  className="mt-1 block w-full"
                  value={data.divisi_inv}
                  onChange={(e) => setData("divisi_inv", e.target.value)}
                >
                  <option value="">Select Category</option>
                  {divisi.data.map((inv) => (
                    <option value={inv.id} key={inv.id}>
                      {inv.divisi}
                    </option>
                  ))}
                </SelectInput>

                <InputError
                  message={errors.divisi_inv}
                  className="mt-2"
                />
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
