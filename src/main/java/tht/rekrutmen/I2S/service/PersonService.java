package tht.rekrutmen.I2S.service;

import tht.rekrutmen.I2S.model.Person;

import java.util.List;
import java.util.Optional;

public interface PersonService {
    List<Person> getAllPerson();
    Optional<Person> findById(Long nik);
    List<Person> findByName(String name);
    Person createPerson(Person person);
    Person updatePerson(Long nik, Person person);
    void deletePerson(Long nik);
}
