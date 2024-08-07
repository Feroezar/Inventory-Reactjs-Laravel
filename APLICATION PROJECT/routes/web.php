<?php

use App\Http\Controllers\BarangController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::resource('project', ProjectController::class);
    Route::get('/project/divisi-tasks', [ProjectController::class, 'myInventory'])
        ->name('project.myInventory');
    Route::get('/task/my-tasks', [TaskController::class, 'myTasks'])
        ->name('task.myTasks');
    Route::get('/task/Pemesanan', [TaskController::class, 'pemesanan'])
        ->name('task.pemesanan');
    Route::resource('category', CategoryController::class);
   
    Route::resource('inventory', InventoryController::class);
    Route::post('/inventory/{id}/reduceStock', [InventoryController::class, 'reduceStock'])->name('inventory.reduceStock');
    Route::get('/inventory/laporan', [InventoryController::class, 'laporan'])->name('inventory.laporan');
    Route::get('/laporan', [LaporanController::class, 'index'])->name('laporan.index');
    Route::resource('task', TaskController::class);
    Route::post('/tasks/add-to-inventory/{task}', [ProjectController::class, 'addToInventory'])->name('task.addToInventory');
    Route::resource('user', UserController::class);
    Route::resource('roles', RoleController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
