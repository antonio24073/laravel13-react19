<?php

use App\Http\Controllers\api\OwnersController;
use App\Http\Controllers\api\uploads\VehicleUploadController;
use App\Http\Controllers\api\VehiclesController;
use App\Http\Controllers\api\VehiclesFieldsController;
use App\Http\Controllers\Auth\AuthController as AuthAuthController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:api');

Route::post('/login', [AuthAuthController::class, 'login']);
Route::post('/logout', [AuthAuthController::class, 'logout'])->middleware('auth:api');

Route::post('/register', [AuthAuthController::class, 'store']);

Route::apiResource('vehicles', VehiclesController::class)
    ->middleware('auth:api');

Route::apiResource('owners', OwnersController::class)
    ->middleware('auth:api');

Route::apiResource('vehicles-fields', VehiclesFieldsController::class)
    ->only(['index']);

Route::group(['prefix' => 'uploads', 'middleware' => ['auth:api']], function () {
    Route::resource('vehicle', VehicleUploadController::class)
        ->only(['store', 'update', 'destroy']);
});
