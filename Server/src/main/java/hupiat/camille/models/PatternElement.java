package hupiat.camille.models;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import javax.persistence.*;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Entity
public class PatternElement implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String name;

  @Cascade(CascadeType.ALL)
  @OneToOne(optional = false, orphanRemoval = true)
  private Vector vector;

  @Cascade(CascadeType.REMOVE)
  @OneToMany(orphanRemoval = true)
  private List<PatternElement> nextElements = new LinkedList<>();

  public PatternElement() {}

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Vector getVector() {
    return vector;
  }

  public void setVector(Vector vector) {
    this.vector = vector;
  }

  public List<PatternElement> getNextElements() {
    return nextElements;
  }

  public void setNextElements(List<PatternElement> nextElements) {
    this.nextElements = nextElements;
  }

  /**
   * Find an element in chain recursively
   *
   * @param id the id of element to find
   * @return element if present, empty object otherwise
   */
  public Optional<PatternElement> find(int id) {
    if (id == this.id) {
      return Optional.of(this);
    }
    for (PatternElement next : nextElements) {
      Optional<PatternElement> found = next.find(id);
      if (found.isPresent()) {
        return found;
      }
    }
    return Optional.empty();
  }
}
