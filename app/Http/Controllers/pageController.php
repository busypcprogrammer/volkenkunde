<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class pageController extends Controller
{
    public function index()
    {
        $nav = self::navigationTracker();
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
        return view('home')->with(['nav' => $nav]);
    }
    
    public function categoryHandler($parent, $page = 0)
    {
        echo 'category';
    }
    
    public function subCategoryHandler($parent, $child, $page = 0)
    {
        echo 'sub-category';
    }
    
    public function postHandler($parent, $child, $post)
    {
        echo 'post';
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
        $nav = '<div id="main-menu" class="col-md-12 no-padding navbar-collapse collapse block block-system block-menu">';
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
            $myString .= '<li>' . $item->name;
            if (count($subNavItems) > 0)
            {
                $myString .= '<ul>';
                foreach($subNavItems as $subItem)
                {
                    $myString .= '<li>' . $subItem->name . '</li>';
                }
                $myString .= '</ul>';
            }
            
            $myString .= '</li></ul>';
            $nav .= $myString . '</div>';
        }
        return $nav;
    }
}
