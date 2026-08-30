<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});


Route::view('/{any?}', 'app')
    ->where('any', '.*');


