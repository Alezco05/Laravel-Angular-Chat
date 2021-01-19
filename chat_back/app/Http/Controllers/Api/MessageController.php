<?php

namespace App\Http\Controllers\Api;

use App\Events\ChatEvent;
use App\Events\DirectMessageEvent;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function send(Request $request) {
        broadcast(new ChatEvent($request->message))->toOthers();

        return response()->json([
            'ok'    => true,
            'message'   => 'Mensaje enviado correctamente',
        ]);
    }

    public function sendDM(Request $request) {
        $data = $request->only(['message', 'to']);

        event(new DirectMessageEvent($data));

        return response()->json([
            'ok'    => true,
            'message'   => 'Mensaje enviado correctamente',
        ]);
    }
}
