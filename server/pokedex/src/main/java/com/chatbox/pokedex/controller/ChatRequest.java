package com.chatbox.pokedex.controller;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChatRequest(
		@NotBlank(message = "A mensagem não pode estar vazia.")
		@Size(max = 500, message = "A mensagem deve ter no máximo 500 caracteres.") String message,
		@Size(max = 10, message = "O histórico pode conter no máximo 10 mensagens.")
		List<@Valid ChatMessage> history) {
}
