<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\demandeController;
use App\Http\Controllers\userController;
use App\Http\Middleware\CorsMiddleware;



use App\Http\Controllers\AuthController;


Route::middleware(['CorsMiddleware'])->group(function ( ){
    
    //demande crud
    Route::resource('demande',demandeController::class);
    
    // Authentication Routes
        Route::post('login', [AuthController::class, 'login']);

        Route::post('register', [AuthController::class, 'register']);

    // Protected Routes (require authentication)
        Route::group(['middleware' => 'auth.jwt'], function () {
            Route::get('me', [AuthController::class, 'me']);
            Route::post('logout', [AuthController::class, 'logout']);
            Route::post('refresh', [AuthController::class, 'refresh']);
        });
})








/*Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});*/