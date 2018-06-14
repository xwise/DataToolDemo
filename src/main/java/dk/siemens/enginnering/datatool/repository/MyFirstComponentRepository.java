package dk.siemens.enginnering.datatool.repository;

import dk.siemens.enginnering.datatool.domain.MyFirstComponent;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MyFirstComponent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MyFirstComponentRepository extends JpaRepository<MyFirstComponent, Long>, JpaSpecificationExecutor<MyFirstComponent> {

}
