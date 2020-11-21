package hupiat.camille.controllers;

import hupiat.camille.consistencies.ParametersChecker;
import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.exceptions.NotFoundException;
import hupiat.camille.models.Pattern;
import hupiat.camille.models.PatternElement;
import hupiat.camille.repositories.PatternElementsRepository;
import hupiat.camille.repositories.PatternsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("patterns/elements")
public class PatternElementsController {

  private final PatternsRepository patternsRepository;
  private final PatternElementsRepository repository;

  public PatternElementsController(
      PatternsRepository patternsRepository, PatternElementsRepository repository) {
    this.patternsRepository = patternsRepository;
    this.repository = repository;
  }

  @PostMapping(value = "{patternId}")
  public PatternElement insert(
      @PathVariable(value = "patternId") int patternId,
      @RequestParam(value = "previousElementId", required = false) Integer previousElementId,
      @RequestBody PatternElement element)
      throws NotFoundException, BadValueException {
    Optional<Pattern> pattern = patternsRepository.findById(patternId);
    if (pattern.isEmpty()) {
      throw new NotFoundException("Pattern with id " + patternId + " has not been found");
    }
    ParametersChecker.forElement(element);
    if (previousElementId != null) {
      // Adding after parent
      Optional<PatternElement> parentElement =
          pattern.get().getElements().stream()
              .filter(e -> previousElementId == e.getId())
              .findAny();
      if (parentElement.isEmpty()) {
        throw new BadValueException(
            "Pattern element with id "
                + previousElementId
                + " does not exist for pattern with id "
                + patternId);
      }
      parentElement.get().getNextElements().add(element);
    } else {
      // First chain element
      pattern.get().getElements().add(element);
    }
    patternsRepository.save(pattern.get());
    return element;
  }

  @PutMapping(value = "{patternId}")
  public PatternElement update(
      @PathVariable(value = "patternId") int patternId, @RequestBody PatternElement element)
      throws NotFoundException, BadValueException {
    Optional<Pattern> pattern = patternsRepository.findById(patternId);
    if (pattern.isEmpty()) {
      throw new NotFoundException("Pattern with id " + patternId + " has not been found");
    }
    Optional<PatternElement> old =
        pattern.get().getElements().stream().filter(e -> e.getId() == element.getId()).findAny();
    if (old.isEmpty()) {
      throw new BadValueException(
          "Pattern element with id "
              + element.getId()
              + " does not exist for pattern with id "
              + patternId);
    }
    ParametersChecker.forElement(element);
    old.get().setName(element.getName());
    old.get().setVector(element.getVector());
    old.get().setNextElements(element.getNextElements());
    patternsRepository.save(pattern.get());
    return element;
  }

  @DeleteMapping
  public PatternElement delete(@RequestParam(value = "id") int id) throws NotFoundException {
    Optional<PatternElement> element = repository.findById(id);
    if (element.isEmpty()) {
      throw new NotFoundException("Pattern element with id " + id + " has not been found");
    }
    repository.delete(element.get());
    return element.get();
  }
}
