package WEBT.lab2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
	
	@GetMapping("/")
	private String home_Get() {
		return "home";
	}
}
// Made by EugeneVV