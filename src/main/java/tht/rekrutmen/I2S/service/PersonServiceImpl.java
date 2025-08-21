package tht.rekrutmen.I2S.service;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tht.rekrutmen.I2S.exception.DuplicateDataException;
import tht.rekrutmen.I2S.model.Person;
import tht.rekrutmen.I2S.repository.PersonRepo;

import java.util.List;
import java.util.Optional;

@Service
public class PersonServiceImpl implements PersonService{

    private final PersonRepo personRepo;

    public PersonServiceImpl(PersonRepo personRepo){
        this.personRepo = personRepo;
    }

    @Override
    public List<Person> getAllPerson() {
        return personRepo.findAll(Sort.by(Sort.Direction.ASC, "nik"));
    }

    @Override
    public Optional<Person> findById(Long nik) {
        return personRepo.findById(nik);
    }

    @Override
    public List<Person> findByName(String name) {
        return personRepo.findByName(name);
    }

    @Override
    public Person createPerson(Person person) {
        if(personRepo.existsById(person.getNik())){
            throw new DuplicateDataException("Duplicate NIK");
        }
        return personRepo.save(person);
    }

    @Override
    public Person updatePerson(Long nik, Person person) {
        Optional<Person> existingPerson = personRepo.findById(nik);
        if(existingPerson.isPresent()){
            person.setNik(nik);
            return personRepo.save(person);
        }else{
            throw new RuntimeException("NotFound");
        }
    }

    @Override
    public void deletePerson(Long nik) {
        if(personRepo.existsById(nik)){
            personRepo.deleteById(nik);
        } else {
            throw new RuntimeException("NotFound");
        }

    }
}
