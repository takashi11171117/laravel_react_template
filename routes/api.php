<?php

use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PdfController;
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
    Route::get('/todos', 'index')->name('todos.index');
    Route::get('/todos/{id}','show')->name('todos.show');
    Route::post('/todos', 'store')->name('todos.store');
    Route::post('/todos/{todo}', 'storeImage')->name('todos.store_image');
    Route::post('/todos/{todo}/pdf', 'storePDF')->name('todos.store_pdf');
    Route::put('/todos/{todo}', 'update')->name('todos.update');
    Route::post('/todos/{todo}/{image}', 'updateImage')->name('todos.update_image');
    Route::delete('/todos/{todo}', 'destroy')->name('todos.destroy');
    Route::delete('/todos/{todo}/{image}', 'destroyImage')->name('todos.destroy_image');
});

Route::controller(ImageController::class)->group(function () {
    Route::get('/images', 'index')->name('images.index');
    Route::get('/images/{id}', 'show')->name('images.show');
    Route::post('/images', 'store')->name('images.store');
    Route::post('/images/{image}', 'update')->name('images.update');
    Route::delete('/images/{image}', 'destroy')->name('images.destroy');
});

Route::controller(PDFController::class)->group(function () {
    Route::get('/pdfs', 'index')->name('pdfs.index');
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/me', [UserController::class, 'me']);
});
