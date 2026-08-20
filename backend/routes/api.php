<?php

use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Events API working'
    ]);
});


Route::middleware('auth:sanctum')
    ->get('/user', function (Request $request) {
        return response()->json([
            'user' => $request->user(),
        ]);
    });