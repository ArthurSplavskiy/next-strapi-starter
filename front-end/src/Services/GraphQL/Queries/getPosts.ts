import { gql } from 'graphql-request';
import { makeGraphqlRequest } from '@GraphQL/makeGraphqlRequest';

export const getPosts = async () => {
	const query = gql`
		query getPosts($filters: JournalPostFiltersInput, $pagination: PaginationArg, $sort: [String], $publicationState: PublicationState) {
		  journalPosts(filters: $filters, pagination: $pagination, sort: $sort, publicationState: $publicationState) {
			data {
			  id,
			  attributes {
				title,
				created,
				image {
				  data {
					attributes {
					  url
					}
				  }
				},
				createdAt
			  }
			}
		  }
		}
    `;

	const variables = {
		filters: {},
		pagination: {},
		sort: [],
		publicationState: "LIVE"
	};

	const { journalPosts } = await makeGraphqlRequest(query, variables);

	return journalPosts;
};
