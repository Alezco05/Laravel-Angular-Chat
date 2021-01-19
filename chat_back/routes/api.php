<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('auth/register', [App\Http\Controllers\Api\AuthController::class, 'register'])->name('api.auth.register');
Route::post('auth/login', [App\Http\Controllers\Api\AuthController::class, 'login'])->name('api.auth.login');
Route::get('auth/me', [App\Http\Controllers\Api\AuthController::class, 'me'])->name('api.auth.me')->middleware('auth:api');

Route::post('message/send', [App\Http\Controllers\Api\MessageController::class, 'send'])->name('api.message.send')->middleware('auth:api');

Route::post('message/sendDM', [App\Http\Controllers\Api\MessageController::class, 'sendDM'])->name('api.message.sendDM')->middleware('auth:api');
