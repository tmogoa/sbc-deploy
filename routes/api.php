<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\BlogController;
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

Route::post('/login', [AuthController::class, 'login']);

Route::get('/activities', [ActivityController::class, 'index']);
Route::get('/activities/{id}', [ActivityController::class, 'show']);
Route::get('/threeactivitiesfuture/{date}', [ActivityController::class, 'firstThreeFuture']);
Route::get('/threeactivitiespast/{date}', [ActivityController::class, 'firstThreePast']);

Route::get('/blogposts',[BlogController::class, 'showPublished']);
Route::get('/blogposts/{id}', [BlogController::class, 'show']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/register', [AuthController::class, 'register']);

    Route::post('/activities', [ActivityController::class, 'store']);
    Route::post('/update/activities/{id}', [ActivityController::class, 'update']);
    Route::delete('/activities/{id}', [ActivityController::class, 'destroy']);

    Route::get('/all/blogposts',[BlogController::class, 'index']);
    Route::post('/blogposts', [BlogController::class, 'store']);
    Route::post('/blogposts/{id}', [BlogController::class, 'update']);
    Route::post('/upload/blogposts', [BlogController::class, 'upload']);
    Route::delete('/blogposts/{id}', [BlogController::class, 'destroy']);
    
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
