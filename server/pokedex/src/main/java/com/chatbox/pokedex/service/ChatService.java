package com.chatbox.pokedex.service;

import org.springframework.stereotype.Service;

import com.chatbox.pokedex.dto.ChatRequest;
import com.chatbox.pokedex.dto.ChatResponse;

@Service
public class ChatService {

	public ChatResponse reply(ChatRequest request) {
		return new ChatResponse("Eco: " + request.message());
	}
}
