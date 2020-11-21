package hupiat.camille.services;

import hupiat.camille.consistencies.ParametersChecker;
import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.models.Tag;
import hupiat.camille.repositories.TagsRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.util.List;

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

  @PutMapping
  public Tag update(@RequestBody Tag tag) throws BadValueException {
    ParametersChecker.forName(tag.getName());
    return repository.saveAndFlush(tag);
  }
}
