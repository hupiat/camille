package hupiat.camille.fixtures;

import hupiat.camille.exceptions.BadValueException;
import hupiat.camille.exceptions.NotFoundException;
import hupiat.camille.models.Pattern;
import hupiat.camille.models.PatternElement;
import hupiat.camille.models.Tag;
import hupiat.camille.models.Vector;
import hupiat.camille.services.PatternElementsService;
import hupiat.camille.services.PatternsService;
import hupiat.camille.services.TagsService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class PatternsFixture {
  private final PatternsService patternsService;
  private final PatternElementsService patternElementsService;
  private final TagsService tagsRepository;

  private static final int MAX_PATTERNS = 100;
  private static final int MAX_ELEMENTS_BY_PATTERN = 15;

  private static final List<String> FAKE_ELEMENTS =
      List.of(
          "Looking at the sky",
          "Angry as fuck",
          "Thinking about life",
          "Thinking about cats",
          "Thinking about cows");

  private static final List<String> FAKE_TAGS = List.of("Sadness", "Happiness", "Anger");

  public PatternsFixture(
      PatternsService patternsService,
      PatternElementsService patternElementsService,
      TagsService tagsRepository) {
    this.patternsService = patternsService;
    this.patternElementsService = patternElementsService;
    this.tagsRepository = tagsRepository;
  }

  public void inject() throws BadValueException, NotFoundException {
    List<Tag> tags = new ArrayList<>();
    for (int i = 0; i < FAKE_TAGS.size(); i++) {
      // Creating tags
      Tag tag = new Tag();
      tag.setName(FAKE_TAGS.get(i));
      tag = tagsRepository.insert(tag);
      tags.add(tag);
    }
    for (int i = 1; i <= MAX_PATTERNS; i++) {
      // Creating patterns
      Random random = new Random();
      Pattern pattern = new Pattern();
      pattern.setName("Pattern " + i);
      pattern = patternsService.insert(pattern);
      pattern.getTags().add(tags.get(random.nextInt(FAKE_TAGS.size())));
      pattern = patternsService.update(pattern);

      PatternElement previousElement = null;
      for (int j = 0; j < random.nextInt(MAX_ELEMENTS_BY_PATTERN + 1); j++) {
        // Creating elements
        PatternElement element = new PatternElement();
        element.setName(FAKE_ELEMENTS.get(random.nextInt(FAKE_ELEMENTS.size())));
        // Setting positions
        Vector vector = new Vector();
        vector.setX(random.nextInt(101));
        vector.setY(random.nextInt(101));
        element.setVector(vector);
        element =
            patternElementsService.insert(
                pattern.getId(), previousElement == null ? null : previousElement.getId(), element);
        previousElement = element;
      }
    }
  }
}
