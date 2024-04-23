<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Http\Response; // Import the Response class here

class AuthController extends Controller
{
    /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'post' => 'required|string',
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'post' => $request->post,
        ]);

        return response()->json(['message' => 'User registered successfully', 'user' => $user]);
    }

    /**
     * Authenticate a user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
    
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;
    
            return response()->json(['message' => 'User authenticated successfully', 'user' => $user, 'token' => $token]);
        }
    
        // Explicitly set the response status to 401 for failed authentication
        return response()->json(['message' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'User logged out successfully']);
    }
}
