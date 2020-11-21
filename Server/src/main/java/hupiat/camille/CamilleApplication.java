package hupiat.camille;

import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.exceptions.NotFoundException;
import hupiat.camille.fixtures.PatternsFixture;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CamilleApplication {

  private static final boolean FIXTURES = true;

  private final PatternsFixture patternsFixture;

  public CamilleApplication(PatternsFixture patternsFixture)
      throws BadValueException, NotFoundException {
    this.patternsFixture = patternsFixture;
    if (FIXTURES) {
      patternsFixture.inject();
    }
  }

  public static void main(String[] args) {
    SpringApplication.run(CamilleApplication.class, args);
  }
}
