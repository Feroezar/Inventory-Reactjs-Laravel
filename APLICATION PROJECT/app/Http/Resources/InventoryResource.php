<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class InventoryResource extends JsonResource
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
            'kode_barang' => $this->kode_barang,
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
            'image_path' => $this->image_path && !(str_starts_with($this->image_path, 'http')) ?
                    Storage::url($this->image_path) : '',
            'name' => $this->name,
            'stock' => $this->stock,
            'category_id' => $this->category_id,
            'categoryid' => $this->categoryid ? new CategoryResource($this->categoryid) : null,
            'divisi_inv' => $this->divisi_inv,
            'divisiinv' =>$this->divisiinv ? new RoleResource($this->divisiinv) : null,
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
