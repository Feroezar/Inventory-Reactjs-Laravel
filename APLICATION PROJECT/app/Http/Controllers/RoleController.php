<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Http\Resources\RoleResource;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;


class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Role::query();

        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", "asc");

        if (request("divisi")) {
            $query->where("divisi", "like", "%" . request("divisi") . "%");
        }

        $role = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Role/Index", [
            "role" => RoleResource::collection($role),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Role/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        $data = $request->validated();
        Role::create($data);

        return to_route('roles.index')
            ->with('success', 'Task was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        return inertia('Role/Edit', [
            'role' => new RoleResource($role),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        $data = $request->validated();
        
        $role->update($data);

        return to_route('roles.index')
            ->with('success', "Project \"$role->divisi\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $name = $role->divisi;
        $role->delete();
        return to_route('roles.index')
            ->with('success', "Task \"$name\" was deleted");
    }
}
