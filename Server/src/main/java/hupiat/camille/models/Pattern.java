package hupiat.camille.models;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Entity
public class Pattern implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String name;

  @Cascade(CascadeType.REMOVE)
  @OneToMany(orphanRemoval = true)
  private List<PatternElement> elements = new LinkedList<>();

  @ManyToMany private List<Tag> tags = new ArrayList<>();

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
}
