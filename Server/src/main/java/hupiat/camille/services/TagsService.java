package hupiat.camille.services;

import hupiat.camille.consistencies.ParametersChecker;
import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.exceptions.NotFoundException;
import hupiat.camille.models.Tag;
import hupiat.camille.repositories.TagsRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TagsService {
  private final TagsRepository repository;

  public TagsService(TagsRepository repository) {
    this.repository = repository;
  }

  public List<Tag> fetchAll() {
    return repository.findAll();
  }

  public Tag insert(Tag tag) throws BadValueException {
    ParametersChecker.forName(tag.getName());
    return repository.saveAndFlush(tag);
  }

  public Tag update(Tag tag) throws BadValueException {
    ParametersChecker.forName(tag.getName());
    return repository.saveAndFlush(tag);
  }

  public Tag delete(int id) throws NotFoundException {
    Optional<Tag> tag = repository.findById(id);
    if (tag.isEmpty()) {
      throw new NotFoundException("Tag with id " + id + " has not been found");
    }
    return tag.get();
  }
}
