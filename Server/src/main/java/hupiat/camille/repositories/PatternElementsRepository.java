package hupiat.camille.repositories;

import hupiat.camille.models.PatternElement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatternElementsRepository extends JpaRepository<PatternElement, Integer> {}
