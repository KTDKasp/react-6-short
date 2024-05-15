import React from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';
import { Item } from '../../interfaces/item.interface';

interface UsersListProps {
	items: Item[];
	isLoading: boolean;
	isUserInvited: (id: number) => boolean;
	onChangeSearchValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
	searchValue: string;
  onClickInvite: (user: Item) => void;
  onClickSendInvites: () => void;
  invitedUsers: number;
}

export const Users: React.FC<UsersListProps> = ({
	items,
	isLoading,
	isUserInvited,
	searchValue,
	onChangeSearchValue,
  onClickInvite,
  onClickSendInvites,
  invitedUsers
}) => {
	return (
		<>
			<div className="search">
				<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
				</svg>
				<input
					value={searchValue}
					onChange={onChangeSearchValue}
					type="text"
					placeholder="Найти пользователя..."
				/>
			</div>
			{isLoading ? (
				<div className="skeleton-list">
					{[...new Array(items.length)].map((_, index) => (
						<Skeleton key={index} />
					))}
				</div>
			) : (
				<ul className="users-list">
					{items
						.filter((item) => {
							const fullname = (item.first_name + ' ' + item.last_name).toLowerCase();
							return (
								fullname.includes(searchValue.toLowerCase()) ||
								item.email.toLowerCase().includes(searchValue.toLowerCase())
							);
						})
						.map((item) => (
							<User
								key={item.id}
								isInvited={(id: number) => isUserInvited(id)}
                onClickInviteUser={() => onClickInvite(item)}
								{...item}
							/>
						))}
				</ul>
			)}
			<button onClick={onClickSendInvites} className="send-invite-btn" disabled={invitedUsers > 0 ? false : true}>Отправить приглашение</button>
		</>
	);
};
