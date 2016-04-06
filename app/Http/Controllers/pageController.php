<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class pageController extends Controller
{
    public function index()
    {
        echo self::navigationTracker();
        $posts = \DB::table('post')
                ->select('title')
                ->addSelect('content')
                ->addSelect('thumbnail')
                ->addSelect('url')
                ->whereRaw('uploaddate < NOW()')
                ->orderBy('uploaddate', 'DESC')
                ->limit(5)
                ->get();
        $postListing = '';
        foreach($posts as $post)
        {
            $postListing .= '<div>' . $post->content . '</div>';
        }
        echo $postListing;
    }
    
    public function categoryHandler($parent, $page = 0)
    {
        
    }
    
    public function subCategoryHandler($parent, $child, $page = 0)
    {
        
    }
    
    public function postHandler($parent, $child, $post = null)
    {
        
    }
    
    private static function navigationTracker()
    {
        $navItems = \DB::table('navigation')
                ->select('category.name')
                ->addSelect('category.url')
                ->addSelect('category.id')
                ->where('navigation.parentid', '=', '0')
                ->join('category', 'category.id', '=', 'navigation.categoryid')
                ->orderBy('order')
                ->get();
        $nav = '';
        foreach($navItems as $item)
        {
            $myString = '<ul>';
            $subNavItems = \DB::table('navigation')
                    ->select('category.name')
                    ->addSelect('category.url')
                    ->where('navigation.parentid', '=', $item->id)
                    ->orderBy('order')
                    ->join('category', 'category.id', '=', 'navigation.categoryid')
                    ->get();
            $myString .= '<li>' . $item->name . '</li>';
            if (count($subNavItems) > 0)
            {
                $myString .= '<ul>';
                foreach($subNavItems as $subItem)
                {
                    $myString .= '<li>' . $subItem->name . '</li>';
                }
                $myString .= '</ul>';
            }
            
            $myString .= '</ul>';
            $nav .= $myString;
        }
        return $nav;
    }
}
