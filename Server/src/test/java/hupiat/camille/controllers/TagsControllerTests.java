package hupiat.camille.controllers;

import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.models.Tag;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class TagsControllerTests {
  static Tag tag = new Tag();
  @Autowired TagsController tagsController;

  @BeforeAll
  static void setup() {
    tag.setName("Foo");
  }

  @Test
  @Order(1)
  void insert() {
    try {
      tag = tagsController.insert(tag);
    } catch (BadValueException e) {
      Assertions.fail(e.getMessage());
    }
  }

  @Test
  @Order(2)
  void update() {
    tag.setName("New");
    try {
      tag = tagsController.update(tag);
    } catch (BadValueException e) {
      Assertions.fail(e.getMessage());
    }
  }
}
