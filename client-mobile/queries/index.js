import { gql } from "@apollo/client";

export const GET_JOB_BY_ID = gql`
  query GetJobDetail($getJobDetailId: ID!) {
    getJobDetail(id: $getJobDetailId) {
      id
      _id
      title
      companyId
      minimumSalary
      maximumSalary
      minimumExperience
      maximumExperience
      postDate
      category
      jobType
      description
      updatedDate
      Skills {
        id
        jobId
        name
        level
      }
      Company {
        id
        name
        companyLogo
        location
        email
        description
      }
      Author {
        _id
        username
        email
        role
        address
        phoneNumber
      }
    }
  }
`;

export const GET_ALL_JOBS = gql`
  query Query {
    getJobs {
      id
      _id
      title
      companyId
      minimumSalary
      maximumSalary
      minimumExperience
      maximumExperience
      postDate
      category
      jobType
      description
      updatedDate
      Skills {
        id
        jobId
        name
        level
      }
      Company {
        id
        name
        companyLogo
        location
        email
        description
      }
      Author {
        _id
        username
        email
        role
        address
        phoneNumber
      }
    }
  }
`;
