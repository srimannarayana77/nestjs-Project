export interface Jobs {
    title: string;
    skills: string[];
    description: string;
    created_by: string;
    number_of_openings: number;
    company_name: string;
    job_location: string;
    salary: number;
    experience_level:string
    employment_type: string
    _id?: string | object;
}
