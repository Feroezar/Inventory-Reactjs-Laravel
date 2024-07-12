<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\BarangResource;
use App\Http\Resources\InventoryResource;
use App\Http\Resources\RoleResource;
use App\Http\Resources\UserCrudResource;
use App\Models\Barang;
use App\Models\Inventory;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();       
        $user = auth()->user();
        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", "asc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("nomor_pr")) {
            $query->where("nomor_pr", "like", "%" . request("nomor_pr") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        $hideedit = $user->divisi && $user->divisi->divisi !== 'PURCHESING';

        return inertia("Task/Pemesanan", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'auth' => [
                'user' => new UserCrudResource($user)
            ],
            'hideedit' => $hideedit,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $nmBarang = Inventory::query()->orderBy('name', 'asc')->get();
        $tasks  = Role::query()->orderBy('divisi', 'asc')->get();
        $users = User::query()
        ->whereIn('role', ['hod', 'spv'])
        ->get();
        return inertia("Task/Create", [
            'nmBarang' => InventoryResource::collection($nmBarang),
            'tasks' => RoleResource::collection($tasks),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }
        Task::create($data);

        return to_route('task.index')
            ->with('success', 'Task was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Task/Show', [
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $nmBarang = Inventory::query()->orderBy('name', 'asc')->get();
        $divisi  = Role::query()->orderBy('divisi', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia("Task/Edit", [
            'task' => new TaskResource($task),
            'nmBarang' => InventoryResource::collection($nmBarang),
            'divisi' => RoleResource::collection($divisi),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }
        $task->update($data);

        return to_route('task.index')
            ->with('success', "Pemesanan Berhasil Di Perbarui");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $task->delete();
        if ($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        return to_route('task.index')
            ->with('success', "Pemesanan \"$name\" Berhasil di hapus");
    }

    public function myTasks(Request $request)
    {
        
    $user = auth()->user(); 
    $query = Task::query()->where('assigned_user_id', $user->id);

    $sortField = $request->get("sort_field", 'created_at');
    $sortDirection = $request->get("sort_direction", "desc");

    if ($request->filled("inv_brg_id")) {
        $inventory = Inventory::where('name', 'like', "%" . $request->get("inv_brg_id") . "%")->pluck('id');
        $query->whereIn("inv_brg_id", $inventory);
    }
    if ($request->filled("nomor_pr")) {
        $query->where("nomor_pr", "like", "%" . $request->get("nomor_pr") . "%");
    }
    if ($request->filled("status")) {
        $query->where("status", $request->get("status"));
    }

    $tasks = $query->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachSide(1);

    return inertia("Task/Index", [
        "tasks" => TaskResource::collection($tasks),
        'queryParams' => $request->query() ?: null,
        'success' => session('success'),
    ]);
    }
    public function pemesanan()
    {
        $query = Task::query();       
    $user = auth()->user();
    $sortField = request("sort_field", 'id');
    $sortDirection = request("sort_direction", "asc");

    if (request("nomor_pr")) {
        $query->where("nomor_pr", "like", "%" . request("nomor_pr") . "%");
    }
    if (request("status")) {
        $query->where("status", request("status"));
    }
    if (request("inv_brg_id")) {
        $invBrgIds = Inventory::where('name', 'like', '%' . request('inv_brg_id') . '%')->pluck('id');
        $query->whereIn('inv_brg_id', $invBrgIds);
    }
    if (request("divisi_task")) {
        $divisiid = Role::where('divisi', 'like', '%' . request('divisi_task') . '%')->pluck('id');
        $query->whereIn('divisi_task', $divisiid);
    }
    $tasks = $query->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachSide(1);

    $hideedit = $user->divisi && $user->divisi->divisi !== 'PURCHESING';

    return inertia("Task/Pemesanan", [
        "tasks" => TaskResource::collection($tasks),
        'queryParams' => request()->query() ?: null,
        'success' => session('success'),
        'auth' => [
            'user' => new UserCrudResource($user)
        ],
        'hideedit' => $hideedit,
    ]);
    }
}
