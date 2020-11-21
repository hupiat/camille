package hupiat.camille.consistencies;

import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.models.PatternElement;

public abstract class ParametersChecker {

  public static void forName(String name) throws BadValueException {
    if (name == null || name.length() < 3 || name.length() > 255) {
      throw new BadValueException("Name " + name + " should be between 3 and 255 chars");
    }
  }

  public static void forElement(PatternElement element) throws BadValueException {
    forName(element.getName());
    if (element.getVector() == null) {
      throw new BadValueException("Element with id " + element.getId() + " should have a vector");
    }
  }
}
