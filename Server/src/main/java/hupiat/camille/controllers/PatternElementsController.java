package hupiat.camille.controllers;

import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.exceptions.NotFoundException;
import hupiat.camille.models.PatternElement;
import hupiat.camille.services.PatternElementsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("patterns/elements")
public class PatternElementsController {

  private final PatternElementsService service;

  public PatternElementsController(PatternElementsService service) {
    this.service = service;
  }

  @PostMapping(value = "{patternId}")
  public PatternElement insert(
      @PathVariable int patternId,
      @RequestParam(required = false) Integer previousElementId,
      @RequestBody PatternElement element)
      throws NotFoundException, BadValueException {
    return service.insert(patternId, previousElementId, element);
  }

  @PutMapping(value = "{patternId}")
  public PatternElement update(@PathVariable int patternId, @RequestBody PatternElement element)
      throws NotFoundException, BadValueException {
    return service.update(patternId, element);
  }

  @DeleteMapping(value = "{patternId}")
  public PatternElement delete(@PathVariable int patternId, @RequestParam int id)
      throws NotFoundException {
    return service.delete(patternId, id);
  }
}
