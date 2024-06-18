<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomor_pr',
        'stock',
        'inv_brg_id',
        'description',
        'image_path',
        'status',
        'priority',
        'due_date',
        'divisi_task',
        'assigned_user_id',
        'created_by',
        'updated_by',
    ];
    public function inventory()
    {
        return $this->belongsTo(Inventory::class, 'inv_brg_id');
    }
    public function divisiTask()
    {
        return $this->belongsTo(Role::class, 'divisi_task');
    }
    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
