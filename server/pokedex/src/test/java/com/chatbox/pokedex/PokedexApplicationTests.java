package com.chatbox.pokedex;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class PokedexApplicationTests {

	@Autowired
	private WebApplicationContext webApplicationContext;

	private MockMvc mockMvc;

	@BeforeEach
	void setUp() {
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
	}

	@Test
	void contextLoads() {
	}

	@Test
	void echoesMessage() throws Exception {
		mockMvc.perform(post("/chat")
				.contentType(MediaType.APPLICATION_JSON)
				.content("""
						{"message":"oi","history":[]}
						"""))
				.andExpect(status().isOk())
				.andExpect(content().json("""
						{"reply":"Eco: oi"}
						"""));

		mockMvc.perform(post("/chat")
				.contentType(MediaType.APPLICATION_JSON)
				.content("""
						{"message":"oi","history":[{"role":"user","content":"olá"},{"role":"assistant","content":"Olá!"}]}
						"""))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.reply").value("Eco: oi"));

		mockMvc.perform(post("/chat")
				.contentType(MediaType.APPLICATION_JSON)
				.content("""
						{"message":"oi","history":null}
						"""))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.reply").value("Eco: oi"));
	}

	@Test
	void rejectsInvalidMessageAndHistory() throws Exception {
		mockMvc.perform(post("/chat")
				.contentType(MediaType.APPLICATION_JSON)
				.content("""
						{"message":"  ","history":[]}
						"""))
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.error").isNotEmpty());

		String oversizedMessage = "x".repeat(501);
		mockMvc.perform(post("/chat")
				.contentType(MediaType.APPLICATION_JSON)
				.content("{\"message\":\"" + oversizedMessage + "\",\"history\":[]}"))
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.error").isNotEmpty());

		String oversizedHistory = "[" + String.join(",",
				java.util.Collections.nCopies(11, "{\"role\":\"user\",\"content\":\"oi\"}")) + "]";
		mockMvc.perform(post("/chat")
				.contentType(MediaType.APPLICATION_JSON)
				.content("{\"message\":\"oi\",\"history\":" + oversizedHistory + "}"))
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.error").isNotEmpty());
	}

	@Test
	void rejectsInvalidRoleAndJson() throws Exception {
		mockMvc.perform(post("/chat")
				.contentType(MediaType.APPLICATION_JSON)
				.content("""
						{"message":"oi","history":[{"role":"system","content":"instrução"}]}
						"""))
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.error").value(
						"JSON inválido ou role não permitido. Use 'user' ou 'assistant'."));

		mockMvc.perform(post("/chat")
				.contentType(MediaType.APPLICATION_JSON)
				.content("{"))
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.error").isNotEmpty());
	}

	@Test
	void corsAllowsOnlyConfiguredOrigin() throws Exception {
		mockMvc.perform(options("/chat")
				.header("Origin", "http://localhost:5173")
				.header("Access-Control-Request-Method", "POST")
				.header("Access-Control-Request-Headers", "Content-Type"))
				.andExpect(status().isOk())
				.andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:5173"))
				.andExpect(header().string("Access-Control-Allow-Methods", org.hamcrest.Matchers.containsString("POST")));

		mockMvc.perform(options("/chat")
				.header("Origin", "http://example.com")
				.header("Access-Control-Request-Method", "POST"))
				.andExpect(status().isForbidden())
				.andExpect(header().doesNotExist("Access-Control-Allow-Origin"));
	}
}
