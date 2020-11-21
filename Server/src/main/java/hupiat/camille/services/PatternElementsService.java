package hupiat.camille.services;

import hupiat.camille.consistencies.ParametersChecker;
import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.exceptions.NotFoundException;
import hupiat.camille.models.Pattern;
import hupiat.camille.models.PatternElement;
import hupiat.camille.repositories.PatternElementsRepository;
import hupiat.camille.repositories.PatternsRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class PatternElementsService {
  private final PatternsRepository patternsRepository;
  private final PatternElementsRepository repository;

  public PatternElementsService(
      PatternsRepository patternsRepository, PatternElementsRepository repository) {
    this.patternsRepository = patternsRepository;
    this.repository = repository;
  }

  public PatternElement insert(int patternId, Integer previousElementId, PatternElement element)
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
              .filter(e -> e.find(previousElementId).isPresent())
              .findAny();
      if (parentElement.isEmpty()) {
        throw new BadValueException(
            "Pattern element with id "
                + previousElementId
                + " does not exist for pattern with id "
                + patternId);
      }
      parentElement = parentElement.get().find(previousElementId);
      parentElement.get().getNextElements().add(element);
    } else {
      // First chain element
      pattern.get().getElements().add(element);
    }
    element = repository.saveAndFlush(element);
    patternsRepository.save(pattern.get());
    return element;
  }

  public PatternElement update(int patternId, PatternElement element)
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
    repository.save(old.get());
    return element;
  }

  public PatternElement delete(int patternId, int id) throws NotFoundException {
    Optional<Pattern> pattern = patternsRepository.findById(patternId);
    if (pattern.isEmpty()) {
      throw new NotFoundException("Pattern with id " + patternId + " has not been found");
    }
    Optional<PatternElement> element = repository.findById(id);
    if (element.isEmpty()) {
      throw new NotFoundException("Pattern element with id " + id + " has not been found");
    }
    pattern.get().getElements().remove(element.get());
    patternsRepository.save(pattern.get());
    repository.delete(element.get());
    return element.get();
  }
}
