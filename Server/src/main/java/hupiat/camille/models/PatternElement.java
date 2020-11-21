package hupiat.camille.models;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Entity
public class PatternElement {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String name;

  @Cascade(CascadeType.ALL)
  @OneToOne
  private Vector vector;

  @Cascade(CascadeType.REMOVE)
  @OneToMany
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
}
