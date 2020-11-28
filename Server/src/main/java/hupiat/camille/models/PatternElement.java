package hupiat.camille.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Entity
public class PatternElement implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String name;

  @OneToOne(optional = false, orphanRemoval = true, cascade = CascadeType.ALL)
  private Vector vector;

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

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    PatternElement that = (PatternElement) o;
    return id == that.id && name.equals(that.name);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name);
  }
}
