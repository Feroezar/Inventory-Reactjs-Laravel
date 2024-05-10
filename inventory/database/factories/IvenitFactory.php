<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ivenit>
 */
class IvenitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'image_path' => fake()->imageUrl(),
            'nomor_pr' => fake()->numberBetween(100,200),
            'nm_barang' => fake()->sentence(),
            'description' => fake()->realText(),
            'stock' => fake()->numberBetween(0,100),
            'created_by' => 4,
            'updated_by' => 4,
            'created_at' => time(),
            'updated_at' => time()
        ];
    }
}
