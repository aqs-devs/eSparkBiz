import * as applicantRepository from './repository.js';
import type { BasicInfoListQuery, UpdateBasicInfo } from '@job-applicants/schemas';
import { filterableBasicInfoFields, type BasicInfoFilterOptions } from '@job-applicants/shared';
import { type CreateBasicInfo } from '@job-applicants/schemas';
import { toBasicInfoDto } from './mapper.js';
import { pluckFirstColumn } from '../../utils/shape-shifter.js';
import { City, Country, State } from 'country-state-city';

export async function listPaginatedApplicants( query: BasicInfoListQuery /* removed {pageSize, page, sortOn, order} */ ) {
    const { page, pageSize, sortOn, order, city, designation, state, gender, relationship_status, dob_from, dob_to } = query;
    
    const filters = { city, designation, state, gender, relationship_status };

    const offset = (page - 1) * pageSize;

    const rows = await applicantRepository.findAll({ pageSize, offset, sortOn, order, filters, dob_from, dob_to });

    // console.debug('applicants ', rows)
    const total = await applicantRepository.getCount({filters, dob_from, dob_to});
    const totalCount = Number(total.count);

    return {
        data: rows.map(toBasicInfoDto),
        pagination: {
            page,
            offset,
            pageSize,
            total: totalCount,
            pageCount: Math.ceil(totalCount / pageSize),
        },
    };
}

export async function getFilterOptions() {

    // const result: BasicInfoFilterOptions = {};   
    const result: BasicInfoFilterOptions = {
        designation: [],
        country: [],
        state: [],
        city: [],
        gender: [],
        relationshipStatus: [],
    };

    result.country = Country.getAllCountries().map(c => c.name);

    result.state = pluckFirstColumn(
        await applicantRepository.findDistinct("state")
    );
    
    result.city = pluckFirstColumn(
        await applicantRepository.findDistinct("city")
    );

    result.designation = pluckFirstColumn(
        await applicantRepository.findDistinct("designation")
    );

    for (const field of filterableBasicInfoFields) {
        if (field.filter.type !== "enum") continue;
    
        switch (field.key) {
            case "gender":
                result.gender = [...field.filter.options];
                break;
    
            case "relationshipStatus":
                result.relationshipStatus = [...field.filter.options];
                break;
        }
    }

    return result;
}

export async function createApplicant(payload: CreateBasicInfo) {
    const id = await applicantRepository.insert(payload);

    return toBasicInfoDto(
        await applicantRepository.findByIdOrThrow(id)
    );
}

export async function getApplicant(id: number) {
    return toBasicInfoDto(
        await applicantRepository.findByIdOrThrow(id)
    );
}

export async function updateApplicant(
    id: number,
    data: UpdateBasicInfo,
) {
    await applicantRepository.update(id, data);

    return toBasicInfoDto(
        await applicantRepository.findByIdOrThrow(id)
    );
}

export async function deleteApplicant(id: number) {
    await applicantRepository.softDelete(id);
}

export async function restoreApplicant(id: number) {
    await applicantRepository.restore(id);
}