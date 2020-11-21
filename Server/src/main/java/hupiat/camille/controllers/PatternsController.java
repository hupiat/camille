package hupiat.camille.controllers;

import hupiat.camille.consistencies.ParametersChecker;
import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.exceptions.NotFoundException;
import hupiat.camille.models.Pattern;
import hupiat.camille.repositories.PatternsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("patterns")
public class PatternsController {
  private final PatternsRepository repository;

  public PatternsController(PatternsRepository repository) {
    this.repository = repository;
  }

  @GetMapping
  public List<Pattern> fetchAll() {
    return repository.findAll();
  }

  @PostMapping
  public Pattern insert(@RequestBody Pattern pattern) throws BadValueException {
    ParametersChecker.forName(pattern.getName());
    repository.save(pattern);
    return pattern;
  }

  @PutMapping
  public Pattern update(@RequestBody Pattern pattern) throws BadValueException, NotFoundException {
    Optional<Pattern> opt = repository.findById(pattern.getId());
    if (opt.isEmpty()) {
      throw new NotFoundException("Pattern with id " + pattern.getId() + " has not been found");
    }
    ParametersChecker.forName(pattern.getName());
    repository.save(pattern);
    return pattern;
  }

  @DeleteMapping
  public Pattern delete(@RequestParam(value = "id") int id) throws NotFoundException {
    Optional<Pattern> pattern = repository.findById(id);
    if (pattern.isEmpty()) {
      throw new NotFoundException("Pattern with id " + id + " has not been found");
    }
    repository.delete(pattern.get());
    return pattern.get();
  }
}
