<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\KriteriaController;
use App\Http\Controllers\DaerahController;
use App\Http\Controllers\KepalaKelController;
use App\Http\Controllers\SubKriteriaController;
use App\Http\Controllers\CalonPenerimaController;

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
//AUTH
Route::controller(AuthController::class)->prefix('auth')->group(function () {
    Route::post('login', 'login')->name('auth.login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('index', 'index');
    Route::get('me', 'me');
});
//KRITERIA
Route::controller(KriteriaController::class)->prefix('kriteria')->group(function () {
    Route::get('/', 'index');
    Route::post('/store', 'store');
    Route::post('/update/{id}', 'update');
    Route::post('/delete/{id}', 'destroy');
    Route::get('/show/{id}', 'show');
});
//DAERAH
Route::controller(DaerahController::class)->prefix('daerah')->group(function () {
    Route::get('/', 'index');
    Route::post('/store', 'store');
    Route::post('/update/{id}', 'update');
    Route::post('/delete/{id}', 'destroy');
    Route::get('/show/{id}', 'show');
});
//KEPALA KELUARGA
Route::controller(KepalaKelController::class)->prefix('kepala')->group(function () {
    Route::get('/', 'index');
    Route::post('/store', 'store');
    Route::post('/update/{id}', 'update');
    Route::post('/delete/{id}', 'destroy');
    Route::get('/show/{id}', 'show');
});
//SUB KRITERIA
Route::controller(SubKriteriaController::class)->prefix('subkriteria')->group(function () {
    Route::get('/', 'index');
    Route::post('/store', 'store');
    Route::post('/update/{id}', 'update');
    Route::post('/delete/{id}', 'destroy');
    Route::get('/show/{id}', 'show');
});
//PENERIMA
Route::controller(CalonPenerimaController::class)->prefix('penerima')->group(function () {
    Route::get('/', 'index');
    Route::post('/store', 'store');
    Route::get('/show/{id}', 'show');
});

