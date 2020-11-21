package hupiat.camille.controllers;

import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.models.Tag;
import hupiat.camille.services.TagsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "tags")
public class TagsController {

  private final TagsService service;

  public TagsController(TagsService service) {
    this.service = service;
  }

  @GetMapping
  public List<Tag> fetchAll() {
    return service.fetchAll();
  }

  @PostMapping
  public Tag insert(@RequestBody Tag tag) throws BadValueException {
    return service.insert(tag);
  }

  @PutMapping
  public Tag update(@RequestBody Tag tag) throws BadValueException {
    return service.update(tag);
  }
}
