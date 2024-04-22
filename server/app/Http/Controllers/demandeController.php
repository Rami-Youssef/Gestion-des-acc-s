<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\demandes;

class demandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $demandes= demandes::all();
        return response()->json(['demandes'=>$demandes]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        demandes::create($request ->All());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $demandes = Demande::findOrFail($id);
        return response()->json(['Demande'=>$demandes]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $demandes = Demande::findOrFail($id);
        return response()->json(['Demande'=>$demandes]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $demandes = Demande::findOrFaill($id);
        $demande->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $demandes = Demande::findOrFail($id);
        $demande->delete();
    }
}
