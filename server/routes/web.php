<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\demandeController;
use App\Http\Controllers\userController;
use App\Http\Middleware\CorsMiddleware;


use App\Http\Controllers\AuthController;



    
    

Route::middleware(['cors'])->group(function () {
    Route::resource('demande', demandeController::class);
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('register', [AuthController::class, 'register'])->name('register');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
});


Route::get('/csrf-token', function () {
    return response()->json([
        'csrf_token' => csrf_token(),
    ]);
});


