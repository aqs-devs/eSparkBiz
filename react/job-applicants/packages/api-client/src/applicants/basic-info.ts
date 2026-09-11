import type {
    CreateBasicInfo,
    BasicInfoListQuery,
    UpdateBasicInfo,
} from '@job-applicants/schemas';
// import { orpc } from '../orpc';
import { getOrpcClient } from '../orpc';

export type BasicInfoFilterOptions = Record<string, string[]>;

export async function getApplicants(params?: BasicInfoListQuery) {
    // return http.get<PaginatedResult<BasicInfo>>(Routes.applicants.base, params);
    return getOrpcClient().applicants.basicInfo.list(params ?? {});
}

export async function getFilterOptions() {
    // return http.get<BasicInfoFilterOptions>(Routes.applicants.filterOptions);
    return getOrpcClient().applicants.basicInfo.filterOptions();
}

export async function getApplicant(id: number) {
    // return http.get<BasicInfo>(RouteBuilder.applicants.byId(id));
    return getOrpcClient().applicants.basicInfo.show({ id });
}

export async function createApplicant(data: CreateBasicInfo) {
    // return http.post<BasicInfo>(Routes.applicants.base, data);
    return getOrpcClient().applicants.basicInfo.create(data);
}

export async function updateApplicant(id: number, data: UpdateBasicInfo) {
    // return http.put<BasicInfo>(RouteBuilder.applicants.byId(id), data);
    return getOrpcClient().applicants.basicInfo.update({
        id,
        data,
    });
}

export async function deleteApplicant(id: number) {
    // return http.delete<void>(RouteBuilder.applicants.byId(id));
    return getOrpcClient().applicants.basicInfo.delete({
        id,
    });
}

export async function restoreApplicant(id: number) {
    return getOrpcClient().applicants.basicInfo.restore({
        id,
    });
}