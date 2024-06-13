<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class BarangResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'image_path' => $this->image_path ? Storage::url($this->image_path) : null,
            'kode_barang' => $this->kode_barang,
            'nm_barang' => $this->nm_barang,
            'stock' => $this->stock,
            'kategori' => $this->kategori,
            'dv_barang' => $this->dv_barang,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'), // Assuming $this->created_at is a Carbon instance
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'), // Assuming $this->updated_at is a Carbon instance
            'nmCategory' => new CategoryResource($this->nmCategory), // Assuming $this->nmCategory is a relationship
            'brgDivisi' => new RoleResource($this->brgDivisi), // Assuming $this->brgDivisi is a relationship
            'createdBy' => new UserResource($this->createdBy), // Assuming $this->createdBy is a relationship
            'updatedBy' => new UserResource($this->updatedBy), // Assuming $this->updatedBy is a relationship
        ];
    }
}
