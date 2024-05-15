import React from 'react';
import { Users } from './components/Users';
import { Success } from './components/Success';
import { Item } from './interfaces/item.interface';
import './App.scss';

export const App: React.FC = () => {
	const [items, setItems] = React.useState<Item[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [invitedUsers, setInvitedUsers] = React.useState<Item[]>([]);
	const [searchValue, setSearchValue] = React.useState<string>('');
	const [success, setSuccess] = React.useState<boolean>(false);

	React.useEffect(() => {
		try {
			const fetchData = async () => {
				const response = await fetch('https://reqres.in/api/users');
				const { data }: { data: Item[] } = await response.json();
				setItems(data);
				return data;
			};
			fetchData();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const onClickInvite = (user: Item) => {
		if (invitedUsers.find((obj) => user.id === obj.id)) {
			setInvitedUsers((prev) => prev.filter((obj) => obj.id !== user.id));
		} else {
			setInvitedUsers((prev) => [...prev, user]);
		}
	};

	const isUserInvited = (id: number): boolean => {
		return invitedUsers.some((user) => user.id === id);
	};

	const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

  const onClickSendInvites = () => {
    setSuccess(true);
  }

	return (
		<div className="App">
			{success ? (
				<Success count={invitedUsers.length} />
			) : (
				<Users
					isLoading={isLoading}
					items={items}
					isUserInvited={isUserInvited}
					onChangeSearchValue={onChangeSearchValue}
					searchValue={searchValue}
					onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
          invitedUsers={invitedUsers.length}
				/>
			)}
		</div>
	);
};
