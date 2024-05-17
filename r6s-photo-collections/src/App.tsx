import React from 'react';
import axios from 'axios';

import { Collection } from './Collection';

import './App.scss';

interface ICollection {
	category: number;
	name: string;
	photos: string[];
}

interface MetaData {
  total_items: number;
  total_pages: number;
  current_page: number;
  per_page: number;
  remaining_count: number;
}

interface MokkyResponse {
  meta: MetaData;
  items: ICollection[];
}

type Category = {
	name: string;
};

export const App: React.FC = () => {
	const [collections, setCollections] = React.useState<ICollection[]>([]);
	const [categories, setCategories] = React.useState<Category[]>([]);
	const [searchValue, setSearchValue] = React.useState<string>('');
	const [loading, setLoading] = React.useState<boolean>(true);
  const [categoryId, setCategoryId] = React.useState<number>(0);
  const [page, setPage] = React.useState<number>(1);
  const limit = 3;

  const totalPagesRef = React.useRef(0);

	React.useEffect(() => {
    setLoading(true);
		const fetchCollectionsData = async () => {
			try {
				const { data } = await axios.get<MokkyResponse>(
					`https://4709013f5bd9c4bc.mokky.dev/collection?${categoryId ? `category=${categoryId}&` : ''}page=${page}&limit=${limit}`
				);
        totalPagesRef.current = data.meta.total_pages;
				setCollections(data.items);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchCollectionsData();
	}, [categoryId, page]);

	React.useEffect(() => {
		const fetchCategoriesData = async () => {
			try {
				const { data } = await axios.get<Category[]>(
					'https://4709013f5bd9c4bc.mokky.dev/categories'
				);
				setCategories(data);
			} catch (error) {
				console.log(error);
				alert('Failed to load categories');
			}
		};
		fetchCategoriesData();
	}, []);

	return (
		<div className="App">
			<h1>Моя коллекция фотографий</h1>
			<div className="top">
				<ul className="tags">
					{categories.map((category, index) => (
						<li className={categoryId === index ? 'active' : ''} onClick={() => setCategoryId(index)} key={index}>{category.name}</li>
					))}
				</ul>
				<input
					className="search-input"
					placeholder="Поиск по названию"
					onChange={(e) => setSearchValue(e.target.value)}
					value={searchValue}
				/>
			</div>
			<div className="content">
				{loading ? (
					<h2>Загрузка коллекций...</h2>
				) : (
					collections.filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase())).map((collection, index) => (
						<Collection key={index} name={collection.name} images={collection.photos} />
					))
				)}
			</div>
			<ul className="pagination">
        {
          [...Array(totalPagesRef.current)].map((_, index) => (
            <li className={page === index + 1 ? 'active' : ''} onClick={() => setPage(index + 1)} key={index}>{index + 1}</li>
          ))
        }
			</ul>
		</div>
	);
};

export default App;
