package hupiat.camille.consistencies;

import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.models.PatternElement;

import java.util.List;

public abstract class ParametersChecker {

  public static void forName(String name) throws BadValueException {
    if (name == null || name.length() < 3 || name.length() > 255) {
      throw new BadValueException("Name " + name + " should be between 3 and 255 chars");
    }
  }

  public static void forElements(List<PatternElement> elements) throws BadValueException {
    for (PatternElement element : elements) {
      forName(element.getName());
      if (element.getNextElements().isEmpty() && elements.indexOf(element) != elements.size() - 1) {
        throw new BadValueException("Element with id " + element.getId() + " is orphan");
      }
      if (element.getVector() == null) {
        throw new BadValueException("Element with id " + element.getId() + " should have a vector");
      }
      if (element.getSize() == null) {
        throw new BadValueException("Element with id " + element.getId() + " should have a size");
      }
      if (element.getSize().getHeight() < 0 || element.getSize().getWidth() < 0) {
        throw new BadValueException(
            "Element with id " + element.getId() + " should have a size with positive values");
      }
    }
  }
}
