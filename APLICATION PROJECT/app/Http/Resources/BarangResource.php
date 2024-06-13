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
            'image_path' => $this->image_path && !(str_starts_with($this->image_path, 'http')) ?
                Storage::url($this->image_path) : '',
            'kode_barang' => $this->kode_barang,
            'nm_barang' => $this->nm_barang,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'stock' => $this->stock,
            'status' => $this->status,
            'kategori' => $this->kategori,
            'nmCategory' => $this->nmCategory ? new CategoryResource($this->nmCategory) : null,
            'dv_barang' => $this->dv_barang,
            'brgDivisi' => $this->brgDivisi ? new RoleResource($this->brgDivisi) : null,
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
