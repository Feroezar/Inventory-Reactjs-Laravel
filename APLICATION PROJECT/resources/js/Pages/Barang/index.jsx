import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DIVISI_PRIORITY_CLASS_MAP, DIVISI_PRIORITY_TEXT_MAP } from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import axios from 'axios';
import { useState } from "react";

export default function Index({ auth, users, barang, queryParams = null, success }) {
  const [reduceStock, setReduceStock] = useState({});

  const handleInputChange = (id, value) => {
    setReduceStock({
      ...reduceStock,
      [id]: value,
    });
  };
  const reduceStockForItem = (barangs) => {
    const quantity = reduceStock[barangs.id];
    if (quantity && !isNaN(quantity)) {
      // Make an API call to reduce stock
      axios.post(route("inventory.reduceStock", barangs.id), { quantity })
        .then(response => {
          alert('Stock reduced successfully');
          // Optionally, refresh the page or update state to reflect changes
          router.get(route("inventory.index"), queryParams);
        })
        .catch(error => {
          console.error('Error reducing stock:', error);
          alert('Failed to reduce stock');
        });
    } else {
      alert('Please enter a valid quantity');
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
      queryParams.sort_direction = queryParams.sort_direction === "asc" ? "desc" : "asc";
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("inventory.index"), queryParams);
  };

  const deleteProject = (barangs) => {
    if (!window.confirm("Are you sure you want to delete the project?")) {
      return;
    }
    router.delete(route("inventory.destroy", barangs.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          {users.data.map((user) => {
            if (user.id === auth.user.id) {
              return (
                <h2 key={user.id} className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                  Inventory {user.divisi.divisi}
                </h2>
              );
            }
            return null;
          })}
          <Link
            href={route("inventory.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Inventory" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
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
                      <th className="px-3 py-3">Image</th>
                      <TableHeading
                        name="kode_barang"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Kode Barang
                      </TableHeading>
                      <TableHeading
                        name="nm_barang"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Nama Barang
                      </TableHeading>
                      <TableHeading
                        name="stock"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Stock
                      </TableHeading>
                      <TableHeading
                        name="status"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Status
                      </TableHeading>
                      <TableHeading
                        name="kategori"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Kategori Barang
                      </TableHeading>
                      <TableHeading
                        name="dv_barang"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Divisi Barang
                      </TableHeading>
                      <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Create Date
                      </TableHeading>
                      <th className="px-3 py-3">Updated By</th>
                      <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.kode_barang}
                          placeholder="Kode Barang"
                          onBlur={(e) => searchFieldChanged("kode_barang", e.target.value)}
                          onKeyPress={(e) => onKeyPress("kode_barang", e)}
                        />
                      </th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.nm_barang}
                          placeholder="Nama barang"
                          onBlur={(e) => searchFieldChanged("nm_barang", e.target.value)}
                          onKeyPress={(e) => onKeyPress("nm_barang", e)}
                        />
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.kategori}
                          placeholder="Kategori"
                          onBlur={(e) => searchFieldChanged("kategori", e.target.value)}
                          onKeyPress={(e) => onKeyPress("kategori", e)}
                        />
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {barang.data.map((barangs) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={barangs.id}>
                        <td className="px-3 py-2">{barangs.id}</td>
                        <td className="px-3 py-2">
                          <img src={barangs.image_path} style={{ width: 60 }} />
                        </td>
                        <td className="px-3 py-2">{barangs.kode_barang}</td>
                        <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                          <Link href={route("inventory.show", barangs.id)}>{barangs.nm_barang}</Link>
                        </th>
                        <td className="px-3 py-2 text-right">
                          {barangs.stock}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${barangs.stock < 0 ? "bg-red-100 text-red-800" : barangs.stock < 5 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                          >
                            {barangs.stock < 0 ? "Empty" : barangs.stock < 5 ? "Low Stock" : "Safe"}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-nowrap">{barangs.nmCategory.nm_category}</td>
                        <td className="px-3 py-2">
                          <span className={"px-2 py-1 rounded text-nowrap text-white " + DIVISI_PRIORITY_CLASS_MAP[barangs.brgDivisi.divisi]}>
                            {DIVISI_PRIORITY_TEXT_MAP[barangs.brgDivisi.divisi]}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-nowrap">{barangs.created_at}</td>
                        <td className="px-3 py-2">{barangs.updatedBy.name}</td>
                        <td className="px-3 py-2 text-right">
                        <div className="flex items-center">
                            <Link
                              href={route("inventory.edit", barangs.id)}
                              className="px-3 py-1 bg-indigo-500 text-white rounded ml-2 hover:bg-indigo-600"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteProject(barangs)}
                              className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                            >
                              Delete
                            </button>
                            <input
                              type="number"
                              className="ml-2 px-3 py-1 border rounded w-20"
                              min='1'
                              max={barangs.stock}
                              value={reduceStock[barangs.id] || ''}
                              onChange={(e) => handleInputChange(barangs.id, e.target.value)}
                              placeholder="Qty"
                            />
                            <button
                              onClick={() => reduceStockForItem(barangs)}
                              className="ml-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none"
                            >
                              Reduce
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={barang.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
