<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'meal_category_id', 'restaurant_id', 'number_of_people', 'total_dishes',
    ];

    public function mealCategory()
    {
        return $this->belongsTo(MealCategory::class);
    }

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function dishes()
    {
        return $this->belongsToMany(Dish::class, 'order_dish')->withPivot('quantity');
    }
}
