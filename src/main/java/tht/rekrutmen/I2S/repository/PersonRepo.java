package tht.rekrutmen.I2S.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tht.rekrutmen.I2S.model.Person;

import java.time.LocalDate;
import java.util.List;

public interface PersonRepo extends JpaRepository<Person, Long> {
    @Query("SELECT p FROM Person p WHERE LOWER(p.name) LIKE(CONCAT(:name, '%'))")
    List<Person> findByName(@Param("name") String name);
}
