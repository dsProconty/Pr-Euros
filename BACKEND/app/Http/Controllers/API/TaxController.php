<?php

namespace App\Http\Controllers\API;

use App\Models\Tax;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TaxController extends Controller
{
    // https://carbon.now.sh/
    public function getAll(){
        $data = Tax::get();
        return response()->json($data, 200);
    }

    public function create(Request $request){

        $data['tax'] = $request['tax'];
        $data['description'] = $request['description'];
        Tax::create($data);
        return response()->json([
            'message' => "Successfully created",
            'success' => true
        ], 200);
    }

    public function delete($id){
        $res = Tax::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
    }

    public function get($id){
        $data = Tax::find($id);
        return response()->json($data, 200);
    }

    public function update(Request $request,$id){
        $data['name'] = $request['name'];
        $data['email'] = $request['email'];
        $data['phone'] = $request['phone'];
        Tax::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
    }
}
