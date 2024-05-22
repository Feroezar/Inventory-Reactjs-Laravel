import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    nomorpr:"",
    nm_barang: "",
    description: "",
    stock: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("ivenits.store"), {
        onError: (errors) => {
            console.error(errors);
        },
    });
};
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create new Project
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
                <InputLabel htmlFor="project_nomorpr" value="Nomor PR" />

                <TextInput
                  id="project_nomorpr"
                  type="text"
                  name="nomorpr"
                  value={data.nomorpr}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("nomorpr", e.target.value)}
                />

                <InputError message={errors.nomorpr} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="project_nm_barang" value="Nama Barang" />

                <TextInput
                  id="project_nm_barang"
                  type="text"
                  name="name"
                  value={data.nm_barang}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("nm_barang", e.target.value)}
                />

                <InputError message={errors.nm_barang} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_description"
                  value="Description barang"
                />

                <TextAreaInput
                  id="project_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("description", e.target.value)}
                />

                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_due_date"
                  value="stock barang"
                />

                <TextInput
                  id="project_due_date"
                  type="number"
                  name="stock"
                  value={data.stock}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("stock", e.target.value)}
                />

                <InputError message={errors.stock} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("ivenits.index")}
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