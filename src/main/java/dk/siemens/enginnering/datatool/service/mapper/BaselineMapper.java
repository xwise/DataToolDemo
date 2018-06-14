package dk.siemens.enginnering.datatool.service.mapper;

import dk.siemens.enginnering.datatool.domain.*;
import dk.siemens.enginnering.datatool.service.dto.BaselineDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Baseline and its DTO BaselineDTO.
 */
@Mapper(componentModel = "spring", uses = {FileEntryMapper.class})
public interface BaselineMapper extends EntityMapper<BaselineDTO, Baseline> {



    default Baseline fromId(Long id) {
        if (id == null) {
            return null;
        }
        Baseline baseline = new Baseline();
        baseline.setId(id);
        return baseline;
    }
}
