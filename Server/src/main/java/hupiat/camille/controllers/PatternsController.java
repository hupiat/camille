package hupiat.camille.controllers;

import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.exceptions.NotFoundException;
import hupiat.camille.models.Pattern;
import hupiat.camille.services.PatternsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("patterns")
public class PatternsController {
  private final PatternsService service;

  public PatternsController(PatternsService service) {
    this.service = service;
  }

  @GetMapping
  public List<Pattern> fetchAll() {
    return service.fetchAll();
  }

  @PostMapping
  public Pattern insert(@RequestBody Pattern pattern) throws BadValueException {
    return service.insert(pattern);
  }

  @PutMapping
  public Pattern update(@RequestBody Pattern pattern) throws BadValueException, NotFoundException {
    return service.update(pattern);
  }

  @DeleteMapping
  public Pattern delete(@RequestParam int id) throws NotFoundException {
    return service.delete(id);
  }
}
