<?php

use App\Http\Controllers\DataScraping;
use Illuminate\Support\Facades\Route;


Route::get('/marcas/{id}', [DataScraping::class, 'marcas']);

Route::get('/', function () {
    return view('app');
});

Route::view('/{any?}', 'app')
    ->where('any', '.*');


