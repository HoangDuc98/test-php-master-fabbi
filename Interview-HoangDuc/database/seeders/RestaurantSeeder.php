<?php

namespace Database\Seeders;

use App\Models\Dish;
use App\Models\MealCategory;
use App\Models\Restaurant;
use Illuminate\Database\Seeder;

class RestaurantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dishesData = json_decode(file_get_contents(storage_path('app/dishes.json')), true);

        foreach ($dishesData['dishes'] as $dishData) {
            $restaurant = Restaurant::firstOrCreate(['name' => $dishData['restaurant']]);

            foreach ($dishData['availableMeals'] as $mealName) {
                $mealCategory = MealCategory::firstOrCreate(['name' => $mealName]);

                // Gán danh mục bữa ăn cho nhà hàng nếu chưa tồn tại
                if (!$restaurant->mealCategories->contains($mealCategory->id)) {
                    $restaurant->mealCategories()->attach($mealCategory->id);
                }
            }

            Dish::create([
                'name' => $dishData['name'],
                'restaurant_id' => $restaurant->id,
            ]);
        }
    }
}
