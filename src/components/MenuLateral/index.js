import React, { Component } from 'react';
import './styles.css';
import SideBar from '.';

import Logo from "../../images/logo.png";
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';

export default class MenuLateral extends Component {
    render() {
        return (
            <div className="lado">
                <ProSidebar>
                <SidebarHeader>
                    {<div>
                        <img src={Logo} className="logo-style" alt="Logo Magna" />
                    </div>
                    }
                </SidebarHeader>
                <SidebarContent>
                    {
                    <Menu iconShape="square" className="menu-style">
                        <MenuItem className="item-style"><Link to="/inicio">Início</Link></MenuItem>
                        <MenuItem className="item-style"><Link to="/usuarios">Usuários</Link></MenuItem>
                        <MenuItem className="item-style"><Link to="/propriedades">Propriedades</Link></MenuItem>
                        <MenuItem className="item-style"><Link to="/talhoes">Talhões</Link></MenuItem>
                    </Menu>
                    }  
                </SidebarContent>
                <SidebarFooter>
                    {/**
                     *  You can add a footer for the sidebar ex: copyright
                     */}
                </SidebarFooter>
                </ProSidebar>
            </div>
        );
    }
}