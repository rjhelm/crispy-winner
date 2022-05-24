import React, { useState } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Popover } from '@material-ui/core';
import { useSelector } from 'react-redux';
import UserInfo from '../UserInfo/UserInfo';
import { StoreState } from '../../reducers';

export default function ActiveUserList() {
    // Get user list from redux store
    const { activeUserList } = useSelector((state: StoreState) => state.chat);

    // Local State
    const [userInfoVisible, setUserInfoVisible] = useState(false);
    const [userName, setUserName] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    // Handle clicks for setting anchor to UserInfo
    const handleUserClick = (e: any, userName: string) => {
        setUserName(userName);
        setAnchorEl(e.currentTarget);
        setUserInfoVisible(true);
    }
    
    // Close popup of user info
    const handlePopoverClose = () => {
        setUserInfoVisible(false);
        setAnchorEl(null);
    };

    return (
        <div className='user-list-container'>
            <List className="user-list">
                {activeUserList.map(user => {
                    return (
                        <ListItem button className="user-list-item" onClick={e => handleUserClick(e, user.user_name)}>
                            <ListItemAvatar className="message-user-icon">
                                <Avatar>
                                    <img src={process.env.PUBLIC_URL + '/images/user-icon.png'} alt="user icon" height="48" />
                                    <div className="user-list-online"></div>
                                </Avatar>
                            </ListItemAvatar>
                        </ListItem>
                    );
                })}
            </List>

            <Popover
                id="user-info"
                open={userInfoVisible}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <UserInfo userName={userName} setUserInfoVisible={setUserInfoVisible} />
            </Popover>
        </div>
    );
}
