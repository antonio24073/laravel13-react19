<?php

use App\Http\Controllers\ImageController;
use Illuminate\Support\Facades\Route;

Route::get('/thumb/{path}/{filename}', [ImageController::class, 'thumb'])
    ->where('path', '.*');

Route::get('/', function () {
    return view('app');
});

Route::view('/{any?}', 'app')
    ->where('any', '.*');

