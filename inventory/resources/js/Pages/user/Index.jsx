import React, { useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";


export default function Index({auth, users}) {
    return (
        <AuthenticatedLayout
        user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User</h2>}
        >
        <Head title="Inventori"/>

        <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-blue-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-red-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3">ID</th>
                                        <th className="px-3 py-3">Nama Pengguna</th>
                                        <th className="px-3 py-3">Email</th>
                                        <th className="px-3 py-3">Created At</th>
                                        <th className="px-3 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((project) => (
                                        <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-2">{project.id}</td>
                                            <th className="px-3 py-2 text-dark hover:underline">
                                                {project.name}
                                            </th>
                                            <td className="px-3 py-2">{project.email}</td>
                                            <td className="px-3 py-2">{project.created_at}</td>
                                            <td className="px-3 py-2">
                                                <Link href={route('user.edit', project.id)}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                                    Edit
                                                </Link>
                                                <Link href={route('user.destroy', project.id)}
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}                     
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>


    );
}