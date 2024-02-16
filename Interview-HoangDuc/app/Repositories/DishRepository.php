<?php

namespace App\Repositories;

use App\Models\Dish;

class DishRepository
{
    public function getAllDishes()
    {
        return Dish::all();
    }

    public function getDishesByRestaurant($restaurantId)
    {
        return Dish::where('restaurant_id', $restaurantId)->get();
    }
}
