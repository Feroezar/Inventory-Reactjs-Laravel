<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
    use HasFactory;
    protected $fillable = [
        'barang_id',
        'quantity',
        'user_id',
        'action',
    ];

    public function inventory()
    {
        return $this->belongsTo(Inventory::class, 'barang_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
