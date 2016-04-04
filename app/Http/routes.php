<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'pageController@index');
Route::get('/{parent?}/{page?}', 'pageController@parentHandler');
Route::get('/{parent?}/{child?}/{page?}', 'pageController@childHandler');

Route::get('/{parent?}/{post?}', 'pageController@postHandler');
Route::get('/{parent?}/{child?}/{post?}', 'pageController@postHandler');
