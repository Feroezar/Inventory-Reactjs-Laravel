<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Role::factory()->create([
            'divisi' => 'FINANCE',
        ]);
        Role::factory()->create([
            'divisi' => 'GA',
        ]);
        Role::factory()->create([
            'divisi' => 'IT',
        ]);
        Role::factory()->create([
            'divisi' => 'BDV',
        ]);
        Role::factory()->create([
            'divisi' => 'OPRASIONAL',
        ]);
        Role::factory()->create([
            'divisi' => 'PURCHESING',
        ]);
        Role::factory()->create([
            'divisi' => 'HRD',
        ]);
        
        User::factory()->create([
            'id' => 1,
            'name' => 'Admin',
            'email' => 'ferofelix1@gmail.com',
            'password' => bcrypt('fero.123'),
            'role' =>'admin',
            'divisi_id' => '3',
            'email_verified_at' => time()
        ]);
        User::factory()->create([
            'id' => 2,
            'name' => 'John Smith',
            'email' => 'john@example.com',
            'password' => bcrypt('123.321A'),
            'role' =>'HOD',
            'divisi_id' => '7',
            'email_verified_at' => time()
        ]);

        
    }
}