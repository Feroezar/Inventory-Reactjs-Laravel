import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Create({ auth, barang, dvbarang }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    nm_barang: barang.nm_barang || "",
    kode_barang: barang.kode_barang || "",
    stock: barang.stock || "",
    kategori: barang.kategori || "",
    dv_barang: barang.dv_barang || "",
    _method: "PUT",
});

useEffect(() => {
    console.log(barang); // Log data to check
    console.log(dvbarang); // Log data to check

    if (barang) {
        setData({
            image: "",
            nm_barang: barang.nm_barang || "",
            kode_barang: barang.kode_barang || "",
            stock: barang.stock || "",
            kategori: barang.kategori || "",
            dv_barang: barang.dv_barang || "",
            _method: "PUT",
        });
    }
}, [barang]);

const onSubmit = (e) => {
    e.preventDefault();
    // tambahkan aksi submit disini
};
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit barang "{barang.nm_barang}"
          </h2>
        </div>
      }
    >
      <Head title="barangs" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              {barang.image_path && (
              <div className="mb-4">
                <img src={barang.image_path} className="w-64" />
              </div>
            )}
            <div>
              <InputLabel
                htmlFor="project_image_path"
                value="Project Image"
              />
              <TextInput
                id="project_image_path"
                type="file"
                name="image"
                className="mt-1 block w-full"
                onChange={(e) => setData("image", e.target.files[0])}
              />
              <InputError message={errors.image} className="mt-2" />
            </div>
              <div className="mt-4">
                <InputLabel htmlFor="inv_nm_barang" value="Nama Barang" />

                <TextInput
                  id="inv_name"
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
                <InputLabel htmlFor="inv_kode_barang" value="Kode Barang" />

                <TextInput
                  id="inv_kode_barang"
                  type="text"
                  name="kode_barang"
                  value={data.kode_barang}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("kode_barang", e.target.value)}
                />

                <InputError message={errors.kode_barang} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="inv_dv_barang"
                  value="Divisi"
                />

                <SelectInput
                  name="dv_barang"
                  id="inv_dv_barang"
                  className="mt-1 block w-full"
                  value={data.dv_barang}
                  onChange={(e) => setData("dv_barang", e.target.value)}
                >
                  <option value="">Select User</option>
                  {dvbarang.data.map((roles) => (
                    <option value={roles.id} key={roles.id}>
                      {roles.divisi}
                    </option>
                  ))}
                </SelectInput>

                <InputError
                  message={errors.dv_barang}
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
