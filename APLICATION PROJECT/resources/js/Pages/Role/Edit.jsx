import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, role }) {
  const { data, setData, post, errors, reset } = useForm({
    divisi: role.divisi || "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("roles.update", role.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit project "{role.divisi}"
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
              <div className="mt-4">
                <InputLabel htmlFor="project_divisi" value="Change Divisi" />

                <TextInput
                  id="project_divisi"
                  type="text"
                  name="divisi"
                  value={data.divisi}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("divisi", e.target.value)}
                />

                <InputError message={errors.divisi} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("roles.index")}
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
