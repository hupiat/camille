package hupiat.camille.consistencies;

import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.models.PatternElement;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

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
  public void forElementTest() {
    try {
      ParametersChecker.forElement(new PatternElement());
      Assertions.fail("Vector check should have failed");
    } catch (BadValueException ignored) {
      // Passed
    }
  }
}
