package dk.siemens.enginnering.datatool.service.mapper;

import dk.siemens.enginnering.datatool.domain.*;
import dk.siemens.enginnering.datatool.service.dto.FileEntryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FileEntry and its DTO FileEntryDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FileEntryMapper extends EntityMapper<FileEntryDTO, FileEntry> {


    @Mapping(target = "baselines", ignore = true)
    FileEntry toEntity(FileEntryDTO fileEntryDTO);

    default FileEntry fromId(Long id) {
        if (id == null) {
            return null;
        }
        FileEntry fileEntry = new FileEntry();
        fileEntry.setId(id);
        return fileEntry;
    }
}
