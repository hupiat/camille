package hupiat.camille.services;

import hupiat.camille.consistencies.ParametersChecker;
import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.exceptions.NotFoundException;
import hupiat.camille.models.Pattern;
import hupiat.camille.repositories.PatternsRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PatternsService {

  private final PatternsRepository repository;

  public PatternsService(PatternsRepository repository) {
    this.repository = repository;
  }

  public List<Pattern> fetchAll() {
    return repository.findAll();
  }

  public Pattern insert(Pattern pattern) throws BadValueException {
    ParametersChecker.forName(pattern.getName());
    return repository.saveAndFlush(pattern);
  }

  public Pattern update(Pattern pattern) throws BadValueException, NotFoundException {
    Optional<Pattern> opt = repository.findById(pattern.getId());
    if (opt.isEmpty()) {
      throw new NotFoundException("Pattern with id " + pattern.getId() + " has not been found");
    }
    ParametersChecker.forName(pattern.getName());
    return repository.saveAndFlush(pattern);
  }

  public Pattern delete(int id) throws NotFoundException {
    Optional<Pattern> pattern = repository.findById(id);
    if (pattern.isEmpty()) {
      throw new NotFoundException("Pattern with id " + id + " has not been found");
    }
    repository.delete(pattern.get());
    return pattern.get();
  }
}
