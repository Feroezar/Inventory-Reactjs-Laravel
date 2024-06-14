import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { USER_PRIORITY_TEXT_MAP } from "@/constants.jsx";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, tasks, users, nmBarang }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    stock:"",
    nomor_pr:"",
    status: "pending",
    priority: "",
    due_date:"",
    description: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("task.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create new Task
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
                <InputLabel htmlFor="task_image_path" value="Task Image" />
                <TextInput
                  id="task_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_nomor_pr" value="Nomor PR" />

                <TextInput
                  id="task_nomor_pr"
                  type="text"
                  name="nomor_pr"
                  value={data.nomor_pr}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("nomor_pr", e.target.value)}
                />

                <InputError message={errors.nomor_pr} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_nmBarang"
                  value="Nama Barang"
                />

                <SelectInput
                  name="name"
                  id="task_divisi_task"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("name", e.target.value)}
                >
                  <option value="">Select User</option>
                  {nmBarang.data.map((user) => (
                    <option value={user.id} key={user.id}>
                      {user.nm_barang}
                    </option>
                  ))}
                </SelectInput>

                <InputError
                  message={errors.divisi_task}
                  className="mt-2"
                />
              </div>
              
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_stock"
                  value="Jumlah Barang"
                />

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
                <InputLabel
                  htmlFor="task_description"
                  value="Description"
                />

                <TextAreaInput
                  id="task_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("description", e.target.value)}
                />

                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_due_date" value="Task Deadline" />

                <TextInput
                  id="task_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("due_date", e.target.value)}
                />

                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_divisi_task"
                  value="Untuk Divisi"
                />

                <SelectInput
                  name="divisi_task"
                  id="task_divisi_task"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("divisi_task", e.target.value)}
                >
                  <option value="">Select User</option>
                  {tasks.data.map((user) => (
                    <option value={user.id} key={user.id}>
                      {user.divisi}
                    </option>
                  ))}
                </SelectInput>

                <InputError
                  message={errors.divisi_task}
                  className="mt-2"
                />
              </div>
               <div className="mt-4">
                <InputLabel htmlFor="task_status" value="Task Status" style={{ display: 'none' }}/>

                <SelectInput
                  name="status"
                  id="task_status"
                  className="mt-1 block w-full"
                  onChange={(e) => setData({ ...data, status: e.target.value })}
                  style={{ display: 'none' }} 
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>

                <InputError message={errors.task_status} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="task_assigned_user"
                  value="Assigned User"
                />

                <SelectInput
                  name="assigned_user_id"
                  id="task_assigned_user"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("assigned_user_id", e.target.value)}
                >
                  <option value="">Select User</option>
                  {users.data.map((user) => (
                    <option value={user.id} key={user.id}>
                      {user.name} ( {USER_PRIORITY_TEXT_MAP[user.role]}, {user.divisi.divisi} )
                    </option>
                  ))}
                </SelectInput>

                <InputError
                  message={errors.assigned_user_id}
                  className="mt-2"
                />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_priority" value="Task Priority" />

                <SelectInput
                  name="priority"
                  id="task_priority"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("priority", e.target.value)}
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </SelectInput>

                <InputError message={errors.priority} className="mt-2" />
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={route("task.index")}
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
