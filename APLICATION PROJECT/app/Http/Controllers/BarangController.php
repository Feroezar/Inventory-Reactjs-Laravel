<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Http\Requests\StoreBarangRequest;
use App\Http\Requests\UpdateBarangRequest;
use App\Http\Resources\BarangResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\RoleResource;
use App\Http\Resources\UserCrudResource;
use App\Models\Category;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;


class BarangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $sortField = request("sort_field", 'id');
    $sortDirection = request("sort_direction", "asc");

    $queryss = User::query();
    $query = Barang::with(['nmCategory', 'brgDivisi', 'createdBy', 'updatedBy']);

    if (request("nm_barang")) {
        $query->where("nm_barang", "like", "%" . request("nm_barang") . "%");
    }
    if (request("kode_barang")) {
        $query->where("kode_barang", request("kode_barang"));
    }

    $users = $queryss->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachSide(1);

    $barang = $query->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachSide(1)
        ->through(function ($item) {
            $item->status = $item->status; // Ensure the status is calculated
            return $item;
        });

    return inertia("Barang/Index", [
        "users" => UserCrudResource::collection($users),
        "barang" => BarangResource::collection($barang),
        'queryParams' => request()->query() ?: null,
        'success' => session('success'),
    ]);
}
public function reduceStock(Request $request, $id)
{
    $quantity = $request->input('quantity');
    $inventory = Barang::findOrFail($id);

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
        $category = Category::query()->orderBy('nm_category','asc')->get();
        $divisi = Role::query()->orderBy('divisi', 'asc')->get();
        return inertia('Barang/Create',[
            'category' => CategoryResource::collection($category),
            'divisi' => RoleResource::collection($divisi),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBarangRequest $request)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }
        Barang::create($data);

        return to_route('inventory.index')
            ->with('success', 'Task was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Barang $barang)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Barang $barang)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBarangRequest $request, Barang $barang)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Barang $barang)
    {
        //
    }
}
