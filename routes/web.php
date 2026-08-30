<?php

use App\Http\Controllers\Auth\AuthController as AuthAuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});

Route::view('/{any?}', 'app')
    ->where('any', '.*');


