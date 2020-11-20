package hupiat.camille;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "hello")
public class Controller {

  @GetMapping
  public String hello() {
    return "Hello world !";
  }
}
