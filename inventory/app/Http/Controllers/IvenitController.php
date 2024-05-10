<?php

namespace App\Http\Controllers;

use App\Models\ivenit;
use App\Http\Requests\StoreivenitRequest;
use App\Http\Requests\UpdateivenitRequest;
use App\Http\Resources\IvenitResource;

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
        $sortDirection = request('sort_direction', 'desc');

        if(request('nomor_pr')){
            $query->where('nomor_pr','like','%'. request('nomor_pr'). '%');
        }
        if(request('nm_barang')){
            $query->where('nm_barang','like','%'. request('nm_barang'). '%');
        }
  
        $projectit = $query
            ->orderBy($sortFields, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('Project/Index', [
            "ivenits" =>IvenitResource::collection($projectit),
            'queryParams' => request()->query() ?: null,
        ] );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreivenitRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ivenit $ivenit)
    {
        //
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
