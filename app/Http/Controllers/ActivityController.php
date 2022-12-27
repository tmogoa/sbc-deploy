<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Activity::orderByDesc('when')->paginate(6);
    }

    public function firstThreeFuture($date){
        return Activity::orderByDesc('when')->where('when', '>', $date)->paginate(3);
    }

    public function firstThreePast($date){
        return Activity::orderByDesc('when')->where('when', '<', $date)->paginate(3);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:40',
            'description' => 'required|string',
            'date' => 'required|date',
            'poster' => 'required|image'
        ]);

        $path = Storage::putFile('public/posters', $request->file('poster'));

        $activity = Activity::create([
            'label' => $validated['label'],
            'description' => $validated['description'],
            'when' => $validated['date'],
            'featured_img' => Storage::url($path)
        ]);

        return response([
            'act' => $activity
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Activity::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'label' => 'required|string|max:40',
            'description' => 'required|string',
            'date' => 'required|date',
        ]);

        $activity = Activity::find($id);
        $path = $activity->featured_img;
        $itworked = "";

        if ($request->chimg == "1"){
            $request->validate([
                'poster' => 'required|image'
            ]);
            $path = Storage::url(Storage::putFile('public/posters', $request->file('poster')));
            Storage::delete(basename($activity->featured_img));
        }
        
        $activity->update([
            'label' => $request->label,
            'description' => $request->description,
            'when' => $request->date,
            'featured_img' => $path
        ]);

        return response([
            'act' => $activity,
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $activity = Activity::find($id);
        File::delete($activity->featured_img);
        $status = Activity::destroy($id);
        if($status === 1){
            return response([], 202);
        }
    }
}
