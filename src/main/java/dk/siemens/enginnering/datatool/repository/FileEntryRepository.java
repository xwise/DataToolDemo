package dk.siemens.enginnering.datatool.repository;

import dk.siemens.enginnering.datatool.domain.FileEntry;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FileEntry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FileEntryRepository extends JpaRepository<FileEntry, Long>, JpaSpecificationExecutor<FileEntry> {

}
