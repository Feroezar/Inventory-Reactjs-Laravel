<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Http\Requests\StoreInventoryRequest;
use App\Http\Requests\UpdateInventoryRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\InventoryResource;
use App\Http\Resources\RoleResource;
use App\Models\Category;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Inventory::query();

        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", "asc");

        $inventory = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Inventory/Index", [
            "inventory" => InventoryResource::collection($inventory),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }
    public function laporan(){
        
    }
    public function reduceStock(Request $request, $id)
{
    $quantity = $request->input('quantity');
    $inventory = Inventory::findOrFail($id);

    if (!is_numeric($quantity) || $quantity <= 0) {
        return response()->json(['error' => 'Invalid quantity provided'], 400);
    }

    if ($inventory->stock < $quantity) {
        return response()->json(['error' => 'Insufficient stock'], 400);
    }

    $inventory->stock -= $quantity;
    $inventory['updated_by'] = Auth::id();
    $inventory->save();

    return response()->json(['success' => 'Stock reduced successfully'], 200);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $divisi  = Role::query()->orderBy('divisi', 'asc')->get();
        $category = Category::query()->orderBy('nm_category', 'asc')->get();
        return inertia("Inventory/Create", [
            'category' => CategoryResource::collection($category),
            'divisi' => RoleResource::collection($divisi),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInventoryRequest $request)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            $data['image_path'] = $image->store('task/' . str::random(), 'public');
        }
        Inventory::create($data);

        return to_route('inventory.index')
            ->with('success', 'Task was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Inventory $inventory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inventory $inventory)
    {
        $divisi  = Role::query()->orderBy('divisi', 'asc')->get();
        $category = Category::query()->orderBy('nm_category', 'asc')->get();
        return inertia("Inventory/Edit", [
            'inventory' => new InventoryResource($inventory),
            'category' => CategoryResource::collection($category),
            'divisi' => RoleResource::collection($divisi),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInventoryRequest $request, Inventory $inventory)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($inventory->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($inventory->image_path));
            }
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }
        $inventory->update($data);

        return to_route('inventory.index')
            ->with('success', "Pemesanan \"$inventory->name\" Berhasil Di Perbarui");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inventory $inventory)
    {
        $name = $inventory->name;
        $inventory->delete();
        if ($inventory->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($inventory->image_path));
        }
        return to_route('task.index')
            ->with('success', "Pemesanan \"$name\" Berhasil di hapus");
    }
}
