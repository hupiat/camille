package hupiat.camille.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Size {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private double width;

  private double height;

  public Size() {}

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public double getWidth() {
    return width;
  }

  public void setWidth(double width) {
    this.width = width;
  }

  public double getHeight() {
    return height;
  }

  public void setHeight(double height) {
    this.height = height;
  }
}
