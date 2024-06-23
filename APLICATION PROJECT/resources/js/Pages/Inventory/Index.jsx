import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import { DIVISI_PRIORITY_CLASS_MAP, DIVISI_PRIORITY_TEXT_MAP } from "@/constants";
import { useState } from "react";

export default function Index({ auth, inventory, queryParams = null, success }) {
  const [reduceStock, setReduceStock] = useState({});

  const handleInputChange = (id, value) => {
    setReduceStock({
      ...reduceStock,
      [id]: value,
    });
  };

  const reduceStockForItem = (project) => {
    const quantity = reduceStock[project.id];
    if (quantity && !isNaN(quantity)) {
      // Make an API call to reduce stock
      axios
        .post(route("inventory.reduceStock", project.id), { quantity })
        .then((response) => {
          alert("Stock reduced successfully");
          // Optionally, refresh the page or update state to reflect changes
          router.get(route("inventory.index"), queryParams);
        })
        .catch((error) => {
          console.error("Error reducing stock:", error);
          alert("Failed to reduce stock");
        });
    } else {
      alert("Please enter a valid quantity");
    }
  };

  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("inventory.index"), queryParams);
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
    router.get(route("inventory.index"), queryParams);
  };

  const deleteProject = (role) => {
    if (!window.confirm("Are you sure you want to delete the project?")) {
      return;
    }
    router.delete(route("inventory.destroy", role.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Inventory
          </h2>
          <Link
            href={route("inventory.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="inventory" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-x-auto">
                <div className="flex items-center justify-between mb-2">
                <Link
                  href={route("inventory.laporan")}
                  className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                >
                  Laporan
                </Link>
                </div>
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
                      <TableHeading
                        name="kode_barang"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Kode Barang
                      </TableHeading>
                      <th className="px-3 py-3">Image</th>
                      <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Nama Barang
                      </TableHeading>
                      <TableHeading
                        name="category_id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Kategory Barang
                      </TableHeading>
                      <TableHeading
                        name="stock"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        stock
                      </TableHeading>
                      <th className="px-3 py-3">Status</th>
                      <TableHeading
                        name="divisi_inv"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Divisi
                      </TableHeading>
                      <th className="px-3 py-3">Update By</th>
                      <TableHeading
                        name="updated_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Updated At
                      </TableHeading>
                      <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.kode_barang}
                          placeholder="Kode Barang"
                          onBlur={(e) =>
                            searchFieldChanged("kode_barang", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("kode_barang", e)}
                        />
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="Nama Barang"
                          onBlur={(e) => searchFieldChanged("name", e.target.value)}
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.data.map((project) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={project.id}
                      >
                        <td className="px-3 py-2">{project.id}</td>
                        <td className="px-3 py-2">{project.kode_barang}</td>
                        <td className="px-3 py-2">
                          <img src={project.image_path} style={{ width: 60 }} />
                        </td>
                        <th className="px-3 py-2 text-gray-500 text-nowrap hover:underline">
                          {project.name}
                        </th>
                        <td className="px-3 py-2">
                          {project.categoryid.nm_category}
                        </td>
                        <td className="px-3 py-2">{project.stock}</td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              project.stock == 0
                                ? "bg-red-100 text-red-800"
                                : project.stock < 5
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {project.stock == 0
                              ? "Empty"
                              : project.stock < 5
                              ? "Low Stock"
                              : "Safe"}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={
                              "px-2 py-1 rounded text-nowrap text-white " +
                              DIVISI_PRIORITY_CLASS_MAP[project.divisiinv.divisi]
                            }
                          >
                            {DIVISI_PRIORITY_TEXT_MAP[project.divisiinv.divisi]}
                          </span>
                        </td>
                        <td className="px-3 py-2">{project.updatedBy.name}</td>
                        <td className="px-3 py-2">{project.updated_at}</td>
                        <td className="px-3 py-2 text-nowrap">
                          <Link
                            href={route("inventory.edit", project.id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deleteProject(project)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                          >
                            Delete
                          </button>
                          <input
                            type="number"
                            className="ml-2 px-3 py-1 border rounded w-20"
                            min="1"
                            max={project.stock}
                            value={reduceStock[project.id] || ""}
                            onChange={(e) =>
                              handleInputChange(project.id, e.target.value)
                            }
                            placeholder="Qty"
                          />
                          <button
                            onClick={() => reduceStockForItem(project)}
                            className="ml-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none"
                          >
                            Reduce
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={inventory.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
