package hupiat.camille.consistencies;

import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.models.PatternElement;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ParametersCheckerTests {

  @Test
  void forName() {
    String name = "";
    for (int i = 0; i < ParametersChecker.MIN_LENGTH_NAME - 1; i++) {
      name += "a";
    }
    try {
      ParametersChecker.forName(name);
      Assertions.fail("Name check should have failed");
    } catch (BadValueException ignored) {
      // Passed
    }
    name = "";
    for (int i = 0; i <= ParametersChecker.MAX_LENGTH_NAME; i++) {
      name += "a";
    }
    try {
      ParametersChecker.forName(name);
      Assertions.fail("Name check should have failed");
    } catch (BadValueException ignored) {
      // Passed
    }
  }

  @Test
  void forElement() {
    try {
      ParametersChecker.forElement(new PatternElement());
      Assertions.fail("Vector check should have failed");
    } catch (BadValueException ignored) {
      // Passed
    }
  }
}
