<?php

namespace App\Http\Resources;

use App\Models\Inventory;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TaskResource extends JsonResource
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
            'inv_brg_id' => $this->inv_brg_id,
            'inventory' => $this->inventory ? new InventoryResource($this->inventory) : null,
            'description' => $this->description,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
            'status' => $this->status,
            'stock' => $this->stock,
            'priority' => $this->priority,
            'divisi_task' => $this->divisi_task,
            'divisiTask' => $this->divisiTask ? new RoleResource($this->divisiTask) : null,
            'image_path' => $this->image_path && !(str_starts_with($this->image_path, 'http')) ?
                Storage::url($this->image_path) : '',
            'nomor_pr' => $this->nomor_pr,
            'assigned_user_id' => $this->assigned_user_id,
            'assignedUser' => $this->assignedUser ? new UserResource($this->assignedUser) : null,
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
