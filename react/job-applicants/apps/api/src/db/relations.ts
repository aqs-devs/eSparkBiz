import { relations } from "drizzle-orm/relations";
import { applicant, technologies } from "./schema";

export const technologiesRelations = relations(technologies, ({one}) => ({
	applicant: one(applicant, {
		fields: [technologies.applicantId],
		references: [applicant.id]
	}),
}));

export const applicantRelations = relations(applicant, ({many}) => ({
	technologies: many(technologies),
}));