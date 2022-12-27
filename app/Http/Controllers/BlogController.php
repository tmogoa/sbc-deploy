<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Blog::orderByDesc('created_at')->paginate(6);
    }

    public function showPublished()
    {
        return Blog::where('status', 'published')->orderByDesc('created_at')->paginate(6);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
            'author' => 'required|string'
        ]);

        $blogpost = Blog::create($request->all());

        return response(['post' => $blogpost,'msg' => "Saved successfully"], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Blog::find($id);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
            'author' => 'required|string',
            'status' => 'required|string',
            'featured_img_url' => 'required|string'
        ]);

        $blog = Blog::find($id);

        $blog->update($request->all());

        return response("Updated successfully", 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $status = Blog::destroy($id);
        if($status === 1){
            return response("Deleted successfully", 202);
        }
    }

    public function upload(Request $request){
        $request->validate([
            "image" => 'required|image'
        ]);

        $path = Storage::putFile('public/blog', $request->file('image'));

        return response(['url' => Storage::url($path)], 201);
    }
}
