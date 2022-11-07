import { GetServerSideProps, NextPage } from 'next';
import { withLayout } from '@Layout/Layout';
import { CustomHead } from '@Modules/CustomHead';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import { DataService } from '@Services/DataService';

const Home: NextPage = () => {
	const { data, isSuccess } = useQuery('posts', () => DataService.getPosts());
	return (
		<>
			<CustomHead
				titleKey="home.meta_title"
				descriptionKey="home.meta_description"
				keywordsKey="home.meta_keywords"
				withSuffix={false}
			/>
			{/*{isSuccess && JSON.stringify(data)}*/}
			{
				data?.data.map((post: any) => <div key={post.id}>
					{post.attributes.title}
					<img src={`${process.env.NEXT_PUBLIC_API_DOMAIN+post.attributes.image.data.attributes.url}`} alt={post.attributes.title} width='300'/>
				</div>)
			}
			{/* <HomeContent /> --> VIEW pages */}
		</>
	);
};

export const getStaticProps: GetServerSideProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['post'], () => DataService.getPosts());

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			currency: 'USD'
		},
		revalidate: 1
	};
};

export default withLayout(Home);
