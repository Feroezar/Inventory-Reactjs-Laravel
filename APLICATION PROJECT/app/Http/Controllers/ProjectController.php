<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\UserCrudResource;
use App\Http\Resources\UserResource;
use App\Models\Inventory;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $queryss = User::query();
        $tasksku = Task::query()->where('assigned_user_id', $user->id);
        $query = Task::whereHas('assignedUser', function ($tasksku) use ($user) {
            $tasksku->where('divisi_task', $user->divisi_id);
        });

        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", "asc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }
        $users = $queryss->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        $projects = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Project/Index", [
            "users" => UserCrudResource::collection($users),
            "projects" => TaskResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'user' => $user
        ]);
    }

    /**
     * Add task stock to inventory.
     */
    public function addToInventory(Task $task)
{
    if ($task->is_added_to_inventory) {
        return redirect()->back()->with('error', 'Barang sudah ditambahkan ke inventory.');
    }

    $inventory = Inventory::find($task->inv_brg_id);

    if ($inventory) {
        $inventory->stock += $task->stock;
        $inventory->save();

        $task->is_added_to_inventory = true;
        $task->save();

        return redirect()->back()->with('success', 'Barang berhasil ditambahkan ke inventory.');
    }

    return redirect()->back()->with('error', 'Barang tidak ditemukan di inventory.');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $project)
    {
        $name = $project->name;
        $project->delete();
        if ($project->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        }
        return to_route('project.index')
            ->with('success', "Project \"$name\" was deleted");
    }
}
