import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GroupWork, AddCircleOutline, Home } from "@material-ui/icons";
import { List, Tooltip, IconButton } from "@material-ui/core";
import { changeServer, changeView } from "../../actions";
import { StoreState } from "../../reducers";

interface ServerListProps {
    setModalVisible: (modalVisible: boolean) => void;
    setModalType: (modalType: string) => void;
}

export default function ServerList(props: ServerListProps) {
    // Get state from Redux store
    const chatStore = useSelector((state: StoreState) => state.chat);
    const servers = Object.keys(chatStore.servers);
    const dispatch = useDispatch();

    // Get props from parent
    const { setModalVisible, setModalType } = props;

    // Handle server change and close drawer in mobile view
    const handleServerChange = (server: string) => {
        dispatch(changeServer(server));
    }

    // Show modal and type
    const handleModalShow = () => {
        setModalType("server-create-join");
        setModalVisible(true);
    }

    const handleChangeView = (view: string, callBack?: Function) => {
        dispatch(changeView(view));
        if (callBack !== undefined) callBack();
    }
    

    return (
        <div className="servers-container">
            <List>
                <Tooltip title="Home" key="home" placement="right" className="tooltip">
                    <IconButton className="home-icon" onClick={() => handleChangeView("home")}>
                        <Home />
                    </IconButton>
                </Tooltip>
                <div className="menu-seperator">
                    {servers.map(server => (
                        <Tooltip title={server.split('-')[0]} key={server} placement="right" className="tooltip">
                            <IconButton className="server-icon" onClick={() => handleServerChange(server)}>
                                <GroupWork />
                            </IconButton>
                        </Tooltip>
                    ))}

                    <Tooltip title="Create Server" key="create-server" placement="right" className="tooltip">
                        <IconButton className="server-icon" onClick={() => handleChangeView('servers', () => handleModalShow())}>
                            <AddCircleOutline />
                        </IconButton>
                    </Tooltip>
                </div>
            </List>
        </div>
    )
}