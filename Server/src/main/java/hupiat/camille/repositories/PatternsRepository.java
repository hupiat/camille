package hupiat.camille.repositories;

import hupiat.camille.models.Pattern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatternsRepository extends JpaRepository<Pattern, Integer> {}
