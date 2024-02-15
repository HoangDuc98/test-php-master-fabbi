<?php

namespace App\Repositories;

use App\Models\Dish;

class DishRepository
{
    public function getAllDishes()
    {
        return Dish::all();
    }

}
