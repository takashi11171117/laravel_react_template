<?php

use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImageController;
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

Route::controller(ImageController::class)->group(function () {
    Route::get('/images', 'index')->name('images.index');
    Route::get('/images/{id}', 'show')->name('images.show');
    Route::post('/images', 'store')->name('images.store');
    Route::patch('/images/{image}', 'update')->name('images.update');
    Route::delete('/images/{image}', 'destroy')->name('images.destroy');
});



Route::middleware(['auth:sanctum'])->get('/me', function (Request $request) {
    return $request->user();
});
