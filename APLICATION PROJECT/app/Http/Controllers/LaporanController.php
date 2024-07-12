<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use Carbon\Carbon;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    public function index(Request $request)
{
    $user = auth()->user(); // Get the authenticated user

    // Initialize query with eager loading
    $query = Laporan::with(['inventory.divisiinv', 'user']);

    // Filter by date range if start_date and end_date are provided
    if ($request->filled('start_date') && $request->filled('end_date')) {
        $startDate = Carbon::parse($request->start_date)->startOfDay();
        $endDate = Carbon::parse($request->end_date)->endOfDay();
        $query->whereBetween('created_at', [$startDate, $endDate]);
    }

    // Filter by user's division
    $laporans = $query->whereHas('inventory.divisiinv', function ($query) use ($user) {
            $query->where('divisi_inv', $user->divisi_id);
        })
        ->paginate(10);

    // Return data to the view
    return inertia('Laporan/Index', [
        'laporans' => $laporans,
        'queryParams' => $request->query(),
    ]);
}
}
