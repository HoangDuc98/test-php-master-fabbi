<?php

namespace App\Repositories;

use App\Models\Dish;
use App\Models\Restaurant;

class RestaurantRepository
{
    public function getAllRestaurants()
    {
        return Restaurant::all();
    }

    public function getRestaurantsByMealCategory($mealCategoryId)
    {
        return Restaurant::whereHas('mealCategories', function ($query) use ($mealCategoryId) {
            $query->where('meal_category_id', $mealCategoryId);
        })->get();
    }
}
