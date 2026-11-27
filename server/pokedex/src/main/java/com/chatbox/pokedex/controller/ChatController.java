package com.chatbox.pokedex.controller;

import com.chatbox.pokedex.dto.ChatRequest;
import com.chatbox.pokedex.dto.ChatResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chatbox.pokedex.service.ChatService;

@RestController
@RequestMapping("/chat")
public class ChatController {

	private final ChatService chatService;

	public ChatController(ChatService chatService) {
		this.chatService = chatService;
	}

	@PostMapping
	public ChatResponse chat(@Valid @RequestBody ChatRequest request) {
		return chatService.reply(request);
	}
}
