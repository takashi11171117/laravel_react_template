<?php

use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(UserController::class)->group(function () {
    Route::get('/users', 'index');
});

Route::controller(TodoController::class)->group(function () {
    Route::get('/todos', 'index');
    Route::get('/todos/{id}','show');
    Route::post('/todos', 'store');
    Route::patch('/todos/{todo}', 'update');
    Route::delete('/todos/{todo}', 'destroy');
});



Route::middleware(['auth:sanctum'])->get('/me', function (Request $request) {
    return $request->user();
});
