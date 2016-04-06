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

Route::get('/home', 'pageController@index');

Route::get('/{category}', 'pageController@categoryHandler')
        ->where('category', '[a-z\-]+');

Route::get('/{category}/{subCategory}', 'pageController@subCategoryHandler')
        ->where(['category' => '[a-z\-]+' , 'subCategory' => '[a-z\-]+']);

Route::get('/{category}/{page}', 'pageController@categoryHandler')
        ->where(['category' => '[a-z\-]+', 'page' => '[0-9]']);

Route::get('/{category}/{subCategory}/{page}', 'pageController@subCategoryHandler')
        ->where(['category' => '[a-z\-]+', 'subCategory' => '[a-z\-]+', 'page' => '[0-9]+']);

Route::get('/{category}/{subCategory}/{post}', 'pageController@postHandler')
        ->where(['category' => '[a-z\-]+', 'subCategory' => '[a-z\-]+', 'post' => '[a-z\-0-9]+']);