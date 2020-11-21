package hupiat.camille.controllers;

import hupiat.camille.consistencies.ParametersChecker;
import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.models.Tag;
import hupiat.camille.repositories.TagsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "tags")
public class TagsController {

  private final TagsRepository repository;

  public TagsController(TagsRepository repository) {
    this.repository = repository;
  }

  @GetMapping
  public List<Tag> fetchAll() {
    return repository.findAll();
  }

  @PostMapping
  public Tag insert(@RequestBody Tag tag) throws BadValueException {
    ParametersChecker.forName(tag.getName());
    repository.save(tag);
    return tag;
  }

  @PutMapping
  public Tag update(@RequestBody Tag tag) throws BadValueException {
    ParametersChecker.forName(tag.getName());
    repository.save(tag);
    return tag;
  }
}
