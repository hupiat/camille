package hupiat.camille.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

@Entity
public class Pattern implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String name;

  @OneToMany(orphanRemoval = true)
  private List<PatternElement> elements = new LinkedList<>();

  @ManyToMany(fetch = FetchType.EAGER)
  private List<Tag> tags = new ArrayList<>();

  public Pattern() {}

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

  public List<PatternElement> getElements() {
    return elements;
  }

  public void setElements(List<PatternElement> elements) {
    this.elements = elements;
  }

  public List<Tag> getTags() {
    return tags;
  }

  public void setTags(List<Tag> tags) {
    this.tags = tags;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Pattern pattern = (Pattern) o;
    return id == pattern.id && name.equals(pattern.name);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name);
  }
}
