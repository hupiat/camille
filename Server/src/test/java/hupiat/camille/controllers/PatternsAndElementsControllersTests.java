package hupiat.camille.controllers;

import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.exceptions.NotFoundException;
import hupiat.camille.models.Pattern;
import hupiat.camille.models.PatternElement;
import hupiat.camille.models.Vector;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

import java.util.List;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class PatternsAndElementsControllersTests {
  @Autowired PatternsController patternsController;
  @Autowired PatternElementsController patternElementsController;

  static Pattern pattern = new Pattern();
  static PatternElement element = new PatternElement();

  @BeforeAll
  static void setup() {
    element.setName("Foo");
    element.setVector(new Vector());
    pattern.setName("Foo");
  }

  @Test
  @Order(1)
  void insertPattern() {
    try {
      pattern = patternsController.insert(pattern);
    } catch (BadValueException e) {
      Assertions.fail(e.getMessage());
    }
  }

  @Test
  @Order(2)
  void updatePattern() {
    pattern.setName("New");
    try {
      pattern = patternsController.update(pattern);
    } catch (NotFoundException | BadValueException e) {
      Assertions.fail(e.getMessage());
    }
  }

  @Test
  @Order(3)
  void insertPatternElement() {
    PatternElement other = new PatternElement();
    other.setName("other");
    other.setVector(new Vector());
    try {
      element = patternElementsController.insert(pattern.getId(), null, element);
      other = patternElementsController.insert(pattern.getId(), element.getId(), other);
      Assert.isTrue(other.getId() != 0, "Other element in chain should have an id");
    } catch (NotFoundException | BadValueException e) {
      Assertions.fail(e.getMessage());
    }
  }

  @Test
  @Order(4)
  void updatePatternElement() {
    element.setName("New");
    try {
      element = patternElementsController.update(pattern.getId(), element);
    } catch (NotFoundException | BadValueException e) {
      Assertions.fail(e.getMessage());
    }
  }

  @Test
  @Order(5)
  void fetchAllPatterns() {
    List<Pattern> patterns = patternsController.fetchAll();
    Assert.notEmpty(patterns, "Patterns should not be empty");
  }

  @Test
  @Order(6)
  void deletePatternElement() {
    try {
      element = patternElementsController.delete(pattern.getId(), element.getId());
    } catch (NotFoundException e) {
      Assertions.fail(e.getMessage());
    }
  }

  @Test
  @Order(7)
  void deletePattern() {
    try {
      pattern = patternsController.delete(pattern.getId());
    } catch (NotFoundException e) {
      Assertions.fail(e.getMessage());
    }
  }
}
