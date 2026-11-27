package com.chatbox.pokedex.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ChatMessage(
		@NotNull(message = "O campo role é obrigatório.") Role role,
		@NotBlank(message = "O campo content não pode estar vazio.")
		@Size(max = 2000, message = "O campo content deve ter no máximo 2000 caracteres.") String content) {

	public enum Role {
		@JsonProperty("user")
		USER,
		@JsonProperty("assistant")
		ASSISTANT
	}
}
