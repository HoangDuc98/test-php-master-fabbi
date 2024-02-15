<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Models\Order;
use App\Repositories\DishRepository;
use App\Repositories\MealCategoryRepository;
use App\Repositories\RestaurantRepository;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    protected $dishRepository;
    protected $mealCategoryRepository;
    protected $restaurantRepository;

    public function __construct(DishRepository $dishRepository, MealCategoryRepository $mealCategoryRepository, RestaurantRepository $restaurantRepository)
    {
        $this->dishRepository = $dishRepository;
        $this->mealCategoryRepository = $mealCategoryRepository;
        $this->restaurantRepository = $restaurantRepository;
    }

    public function getAllDishes()
    {
        $dishes = $this->dishRepository->getAllDishes();
        return response()->json($dishes);
    }

    public function getAllMealCategories()
    {
        $mealCategories = $this->mealCategoryRepository->getAllMealCategories();
        return response()->json($mealCategories);
    }

    public function getAllRestaurants()
    {
        $restaurants = $this->restaurantRepository->getAllRestaurants();
        return response()->json($restaurants);
    }

    public function store(OrderRequest $request)
    {
        $attributes = $request->validated();
        // Check if process_step is 1
        if ($request->input('process_step') == 1) {
            return response()->json($attributes);
        }

        DB::beginTransaction();

        try {
            $totalDishes = 0;
            foreach ($request->input('dishes') as $dish) {
                $totalDishes += $dish['quantity'];
            }

            $order = Order::create([
                'meal_category_id' => $request->input('meal_category_id'),
                'restaurant_id' => $request->input('restaurant_id'),
                'number_of_people' => $request->input('number_of_people'),
                'total_dishes' => $totalDishes,
            ]);

            // Attach dishes to the order
            foreach ($request->input('dishes') as $dish) {
                $order->dishes()->attach($dish['id'], ['quantity' => $dish['quantity']]);
            }

            DB::commit();

            return response()->json(['message' => 'Order created successfully'], 201);
        } catch (QueryException $exception) {
            DB::rollback();
            Log::error('Error while creating order: ' . $exception->getMessage());
            return response()->json(['message' => 'Failed to create order'], 500);
        }
    }
}
