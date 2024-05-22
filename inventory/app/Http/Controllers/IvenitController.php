<?php

namespace App\Http\Controllers;

use App\Models\ivenit;
use App\Http\Requests\StoreivenitRequest;
use App\Http\Requests\UpdateivenitRequest;
use App\Http\Resources\IvenitResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class IvenitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->id();

        $query = ivenit::query();

        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'asc');

        if (request('start_date') && request('end_date')) {
            $query->whereBetween('created_at', [request('start_date'), request('end_date')]);
        } elseif (request('start_date')) {
            $query->whereDate('created_at', '>=', request('start_date'));
        } elseif (request('end_date')) {
            $query->whereDate('created_at', '<=', request('end_date'));
        }
        if(request('nomor_pr')){
            $query->where('nomor_pr','like','%'. request('nomor_pr'). '%');
        }
        if(request('nm_barang')){
            $query->where('nm_barang','like','%'. request('nm_barang'). '%');
        }
        if(request('name')){
            $query->whereHas('createdBy', function($query) {
                $query->where('name', 'like', '%' . request('name') . '%');
            });
        }
        $ivenit = $query
            ->orderBy($sortFields, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('Project/Index', [
            "ivenits" =>IvenitResource::collection($ivenit),
            'queryParams' => request()->query() ?: null,
        ] );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreivenitRequest $request)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            $data['image_path'] = $image->store('project/' . Str::random(), 'public');
        }
        ivenit::create($data);

        return to_route('project.index')
            ->with('success', 'Project was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(ivenit $ivenit)
    {
        return inertia('Project/show', [
            'ivenit' => new IvenitResource($ivenit),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ivenit $ivenit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateivenitRequest $request, ivenit $ivenit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ivenit $ivenit)
    {
        //
    }
}
