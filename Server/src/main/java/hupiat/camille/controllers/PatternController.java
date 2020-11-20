package hupiat.camille.controllers;

import hupiat.camille.consistencies.ParametersChecker;
import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.exceptions.NotFoundException;
import hupiat.camille.models.Pattern;
import hupiat.camille.repositories.PatternRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("patterns")
public class PatternController {
  private final PatternRepository repository;

  public PatternController(PatternRepository repository) {
    this.repository = repository;
  }

  @GetMapping
  public List<Pattern> fetchAll() {
    return repository.findAll();
  }

  @PostMapping
  public Pattern insert(@RequestBody Pattern pattern) throws BadValueException {
    ParametersChecker.forName(pattern.getName());
    ParametersChecker.forElements(pattern.getElements());
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
    ParametersChecker.forElements(pattern.getElements());
    repository.save(pattern);
    return pattern;
  }

  @DeleteMapping
  public Pattern delete(@PathVariable(value = "id") int id) throws NotFoundException {
    Optional<Pattern> opt = repository.findById(id);
    if (opt.isEmpty()) {
      throw new NotFoundException("Pattern with id " + id + " has not been found");
    }
    repository.delete(opt.get());
    return opt.get();
  }
}
