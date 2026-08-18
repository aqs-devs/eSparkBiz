import type {
    CreateBasicInfo,
    BasicInfoListQuery,
    UpdateBasicInfo,
} from '@job-applicants/schemas';
import { orpc } from '../orpc';

export type BasicInfoFilterOptions = Record<string, string[]>;

export async function getApplicants(params?: BasicInfoListQuery) {
    // return http.get<PaginatedResult<BasicInfo>>(Routes.applicants.base, params);
    return orpc.applicants.basicInfo.list(params ?? {});
}

export async function getFilterOptions() {
    // return http.get<BasicInfoFilterOptions>(Routes.applicants.filterOptions);
    return orpc.applicants.basicInfo.filterOptions();
}

export async function getApplicant(id: number) {
    // return http.get<BasicInfo>(RouteBuilder.applicants.byId(id));
    return orpc.applicants.basicInfo.show({ id });
}

export async function createApplicant(data: CreateBasicInfo) {
    // return http.post<BasicInfo>(Routes.applicants.base, data);
    return orpc.applicants.basicInfo.create(data);
}

export async function updateApplicant(id: number, data: UpdateBasicInfo) {
    // return http.put<BasicInfo>(RouteBuilder.applicants.byId(id), data);
    return orpc.applicants.basicInfo.update({
        id,
        data,
    });
}

export async function deleteApplicant(id: number) {
    // return http.delete<void>(RouteBuilder.applicants.byId(id));
    return orpc.applicants.basicInfo.delete({
        id,
    });
}

export async function restoreApplicant(id:number) {
    return orpc.applicants.basicInfo.restore({
        id,
    })
}