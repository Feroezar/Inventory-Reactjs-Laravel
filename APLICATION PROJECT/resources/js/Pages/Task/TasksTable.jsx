import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { DIVISI_PRIORITY_CLASS_MAP, DIVISI_PRIORITY_TEXT_MAP, PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Link, router } from "@inertiajs/react";

export default function TasksTable({
  tasks,
  success,
  queryParams = null,
  hideProjectColumn = false,
  hideedit = false,
}) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("task.myTasks"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("task.myTasks"), queryParams);
  };

  const deleteTask = (task) => {
    if (!window.confirm("Are you sure you want to delete the task?")) {
      return;
    }
    router.delete(route("task.destroy", task.id));
  };

  return (
    <>
      {success && (
        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
          {success}
        </div>
      )}
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <TableHeading
                name="id"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                ID
              </TableHeading>
              <th className="px-3 py-3">Nomor PR</th>
              <TableHeading
                name="stock"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Nama Barang
              </TableHeading>
              <TableHeading
                name="status"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Status
              </TableHeading>
              {!hideProjectColumn && (
                <TableHeading
                  name="divisi"
                  sort_field={queryParams.sort_field}
                  sort_direction={queryParams.sort_direction}
                  sortChanged={sortChanged}
                >
                  Divisi
                </TableHeading>
              )}
              <TableHeading
                name="created_at"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Jumlah
              </TableHeading>
              <TableHeading
                name="created_at"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Create Date
              </TableHeading>
              <TableHeading
                name="update_at"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Update date
              </TableHeading>
              <th className="px-3 py-3">Created By</th>
              {!hideedit && <th className="px-3 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3">
                <TextInput
                  className="w-full"
                  defaultValue={queryParams.nomor_pr}
                  placeholder="Nomor PR"
                  onBlur={(e) =>
                    searchFieldChanged("nomor_pr", e.target.value)
                  }
                  onKeyPress={(e) => onKeyPress("nomor_pr", e)}
                />
              </th>
              <th className="px-3 py-3">
                <TextInput
                  className="w-full"
                  defaultValue={queryParams.inv_brg_id}
                  placeholder="Inventory Name"
                  onBlur={(e) => searchFieldChanged("inv_brg_id", e.target.value)}
                  onKeyPress={(e) => onKeyPress("inv_brg_id", e)}
                />
              </th>
              <th className="px-3 py-3">
                <SelectInput
                  className="w-full"
                  defaultValue={queryParams.status}
                  onChange={(e) => searchFieldChanged("status", e.target.value)}
                >
                  <option value="">Pilih Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </th>
              {!hideProjectColumn && (
                <th className="px-3 py-3">
                  <TextInput
                    className="w-full"
                    defaultValue={queryParams.divisi}
                    placeholder="Divisi"
                    onBlur={(e) => searchFieldChanged("divisi", e.target.value)}
                    onKeyPress={(e) => onKeyPress("divisi", e)}
                  />
                </th>
              )}
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              {!hideedit && <th className="px-3 py-3"></th>}
            </tr>
          </thead>
          <tbody>
            {tasks.data.map((task) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={task.id}
              >
                <td className="px-3 py-2">{task.id}</td>
                <td className="px-3 py-2 text-nowrap">{task.nomor_pr}</td>
                <th className="px-3 py-2 text-gray-500 hover:underline">
                  <Link href={route("task.show", task.id)}>{task.inventory.name}</Link>
                </th>
                <td className="px-3 py-2">
                  <span
                    className={
                      "px-2 py-1 rounded text-nowrap text-white " +
                      PROJECT_STATUS_CLASS_MAP[task.status]
                    }
                  >
                    {PROJECT_STATUS_TEXT_MAP[task.status]}
                  </span>
                </td>
                {!hideProjectColumn && (
                  <td className="px-3 py-2">
                    <span
                      className={
                        "px-2 py-1 rounded text-nowrap text-white " +
                        DIVISI_PRIORITY_CLASS_MAP[task.divisiTask.divisi]
                      }
                    >
                      {DIVISI_PRIORITY_TEXT_MAP[task.divisiTask.divisi]}
                    </span>
                  </td>
                )}
                <td className="px-3 py-2">{task.stock}</td>
                <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                <td className="px-3 py-2">{task.createdBy.name}</td>
                {!hideedit && (
                  <td className="px-3 py-2 text-nowrap">
                    <Link
                      href={route("task.edit", task.id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={(e) => deleteTask(task)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination links={tasks.meta.links} />
    </>
  );
}
