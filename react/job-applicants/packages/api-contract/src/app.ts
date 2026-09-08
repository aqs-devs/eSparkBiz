import { basicInfoContract } from "./applicants/basic-info.ts";

export const appContract = {
  applicants: {
    basicInfo: basicInfoContract,
  },

  auth: {},

  users: {},
};

export type AppContract = typeof appContract;
