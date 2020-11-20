package hupiat.camille.consistencies;

import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.models.PatternElement;
import hupiat.camille.models.Size;
import hupiat.camille.models.Vector;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class ParametersCheckerTests {

  @Test
  public void forNameTest() {
    try {
      ParametersChecker.forName("de");
      Assertions.fail("Name check should have failed");
    } catch (BadValueException ignored) {
      // Passed
    }
    try {
      String name = "";
      for (int i = 0; i <= 256; i++) {
        name += "a";
      }
      ParametersChecker.forName(name);
      Assertions.fail("Name check should have failed");
    } catch (BadValueException ignored) {
      // Passed
    }
  }

  @Test
  public void forElementsTest() {
    try {
      ParametersChecker.forElements(List.of(new PatternElement(), new PatternElement()));
      Assertions.fail("Orphan check should have failed");
    } catch (BadValueException ignored) {
      // Passed
    }
    PatternElement element = new PatternElement();
    try {
      ParametersChecker.forElements(List.of(element));
      Assertions.fail("Vector check should have failed");
    } catch (BadValueException ignored) {
      // Passed
    }
    element.setVector(new Vector());
    try {
      ParametersChecker.forElements(List.of(element));
      Assertions.fail("Size check should have failed");
    } catch (BadValueException ignored) {
      // Passed
    }
    Size size = new Size();
    size.setHeight(-1);
    element.setSize(size);
    try {
      ParametersChecker.forElements(List.of(element));
      Assertions.fail("Size height check should have failed");
    } catch (BadValueException ignored) {
      // Passed
    }
    size.setWidth(-1);
    try {
      ParametersChecker.forElements(List.of(element));
      Assertions.fail("Size width check should have failed");
    } catch (BadValueException ignored) {
      // Passed
    }
  }
}
